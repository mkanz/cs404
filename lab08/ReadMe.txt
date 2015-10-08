To 	: Mr.Mark A Yoder

From 	: Kansul Mahrifa(B13123)						

Lab partners : Ahmed Karanath(B13104), Kansul Mahrifa (B13123)

Date	: 08 October 2015

Subject	: Project report on lab08

  Lab08 was about using loadable kernel modules with the bone. We used instructions on Derek Molloy's website(http://derekmolloy.ie/writing-a-linux-kernel-module-part-1-introduction/) to write our first LKM and load it onto the BeagleBone.
  
  The sample program hello.c was run and the log files(/var/log/kern.log) showed the expected output.
  
  In the next part we added a few more lines to:
     1) Add ourselves as authors
     2) Add another paramter "addr" to show address. Its defualt value is "IIT".
     3) Add line to print the address to kernel log file.
  The new file is saved as "hello2.c"

  We also changed the makefile to complie hello2.c.  

  In this lab we learnt the basics of LKMs, and a few related concepts.
