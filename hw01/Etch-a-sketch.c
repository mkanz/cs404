#include <stdio.h>
#include <termios.h>
#include <unistd.h>

#define MAXX 50
#define MAXY 50

void print_screen(char screen[MAXX][MAXY]){
	int i,	j;
	for(i =0; i < MAXX; i++){
		for(j = 0; j < MAXY; j++){
			if(screen[i][j]=='x')
				printf("x");
			else	printf(" ");
		}
		printf("\n");
	}
}
char getch() {									//To read character from console
        char buf = 0;
        struct termios old = {0};
        if (tcgetattr(0, &old) < 0)
                perror("tcsetattr()");
        old.c_lflag &= ~ICANON;
        old.c_lflag &= ~ECHO;
        old.c_cc[VMIN] = 1;
        old.c_cc[VTIME] = 0;
        if (tcsetattr(0, TCSANOW, &old) < 0)
                perror("tcsetattr ICANON");
        if (read(0, &buf, 1) < 0)
                perror ("read()");
        old.c_lflag |= ICANON;
        old.c_lflag |= ECHO;
        if (tcsetattr(0, TCSADRAIN, &old) < 0)
                perror ("tcsetattr ~ICANON");
        return (buf);
}

int main() {
	int xpos = 0, ypos = MAXY-1;
	int i, j;
	char screen[MAXY][MAXX];
	for(i =0; i < MAXY; i++)
		for(j = 0; j < MAXX; j++)
			screen[i][j] = ' ';
	char c;
	printf("\n\nW:Up\nA:Left\nS:Down\nD:Right\nQ:Quit\n");	//Instruction  to user
	print_screen(screen);
	while(1){
		c= getch();
		//getchar();
		if(c == 'q'||c =='Q')				//checking for quit option
			break;
		else if(c == 'w'||c == 'W'){			//checking for up option
			ypos--;
			if(ypos == 0)
			ypos = MAXY-1;				//checking for wraping aroundif out of bound
			screen[ypos][xpos] = 'x';
		}
		else if(c == 's'|| c == 'S'){				//checking for Down option
			ypos++;
			if(ypos == MAXY)				//checking for wraping aroundif out of bound
				ypos = 0;
			screen[ypos][xpos] = 'x';
		}
		else if(c == 'a' || c == 'A' ){		//checking for Left option
			xpos--; 			//checking for wraping aroundif out of bound
			if(xpos == 0)
				xpos = MAXX-1;
			screen[ypos][xpos] = 'x';
		}
		else if(c == 'd'|| c =='D'){		//checking for Right option
			xpos++;
			if(xpos == MAXX)		//checking for wraping aroundif out of bound
				xpos = 0;
			screen[ypos][xpos] = 'x';
		}
		else					//Other invalid keys
			continue;
		print_screen(screen);			//Printing the array
	}
	return 0;
}
