cmd_/root/lab08/hello.ko := ld -EL -r  -T /usr/src/linux-headers-3.8.13-bone70/scripts/module-common.lds --build-id  -o /root/lab08/hello.ko /root/lab08/hello.o /root/lab08/hello.mod.o
