/********************************************
 * Kansul Mahrifa (B13123)
 * Date: 14-Oct-2015
 * 
 * *****************************************/
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)

#define GPIO0_START_ADDR 0x44E06000
#define GPIO0_END_ADDR   0x44E07FFF
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR   0x4804e000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190
#define P8_17 (1<<27)	//GPIO_27 -> used as switch 0 (GPIO0)
#define P9_12 (1<<28)	//GPIO_60 -> used as switch 1 (GPIO1)
#define USR2 (1<<23)	//output LED0
#define USR3 (1<<24)	//output LED1

int stop = 0;

void signal_handler(int sig);

/* Callback called when SIGINT is sent to the process (Ctrl-C) */
void signal_handler(int sig)
{
    printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	stop = 1;
}

int main(){
	volatile void *gpio0_addr;
	volatile unsigned int *gpio0_setdataout_addr;
	volatile unsigned int *gpio0_cleardataout_addr;
	
	volatile void *gpio1_addr;
	volatile unsigned int *gpio1_setdataout_addr;
	volatile unsigned int *gpio1_cleardataout_addr;
	
	// Set the signal callback for Ctrl-C
    signal(SIGINT, signal_handler);
	
	int fd = open("/dev/mem", O_RDWR);
	
	
	/* Mapping GPIO PORT 0 */
	gpio0_addr = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
	
	if(gpio0_addr == MAP_FAILED) {
        printf("Unable to map GPIO0\n");
        exit(1);
    }
		
	gpio0_datain            = gpio0_addr + GPIO_DATAIN;
	gpio0_oe_addr           = gpio0_addr + GPIO_OE;
	gpio0_setdataout_addr   = gpio0_addr + GPIO_SETDATAOUT;
	gpio0_cleardataout_addr = gpio0_addr + GPIO_CLEARDATAOUT;
	
	printf("GPIO0 mapped to %p\n", gpio0_addr);
    printf("GPIO0 OE mapped to %p\n", gpio0_oe_addr);
    printf("GPIO0 SETDATAOUTADDR mapped to %p\n", gpio0_setdataout_addr);
    printf("GPIO0 CLEARDATAOUT mapped to %p\n", gpio0_cleardataout_addr);
	
	
	/* Mapping GPIO PORT 1 */
	gpio1_addr = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);	
	
	if(gpio1_addr == MAP_FAILED) {
        printf("Unable to map GPIO1\n");
        exit(1);
    }

	gpio1_datain            = gpio1_addr + GPIO_DATAIN;
	gpio1_oe_addr           = gpio1_addr + GPIO_OE;
	gpio1_setdataout_addr   = gpio1_addr + GPIO_SETDATAOUT;
	gpio1_cleardataout_addr = gpio1_addr + GPIO_CLEARDATAOUT;
	
	printf("GPIO1 mapped to %p\n", gpio1_addr);
    printf("GPIO1 OE mapped to %p\n", gpio1_oe_addr);
    printf("GPIO1 SETDATAOUTADDR mapped to %p\n", gpio1_setdataout_addr);
    printf("GPIO1 CLEARDATAOUT mapped to %p\n", gpio1_cleardataout_addr);
	
	/* Loop to read from switch continuously */
	while(!stop) {
		switch0_on = 0;
		switch1_on = 0;
		if(*gpio0_datain==0xFFFFFFFF & P8_17)
			switch0_on = 1;
		if(*gpio1_datain==0xFFFFFFFF & P9_12)
			switch1_on = 1;
		if(switch0_on)
			*gpio0_setdataout_addr = USR2;
		if(switch1_on)
			*gpio1_setdataout_addr = USR3;
	}
	
	munmap((void *)gpio0_addr, GPIO0_SIZE);
	munmap((void *)gpio1_addr, GPIO1_SIZE);
    close(fd);
    return 0;
}
