To 	: Mr.Mark A Yoder

From 	: Kansul Mahrifa(B13123)						

Date	: 3 Nov 2015

Subject	: Device Tree Overlays and Debian Releases

We were asked to configure P9_42to be in input pin, with a pull­up resistor by using a device tree overlay.
Since we had only one Beaglebone, we shared the Beaglebone for this part of the homework. The dts file named 'KNZ-gpio-set.dts' contains the custom dts edited for this homework.

The following steps were followed:

1) These commands were executed:

bone$ export SLOTS=/sys/devices/bone_capemgr.*/slots
bone$ export PINS=/sys/kernel/debug/pinctrl/44e10800.pinmux/pins
bone$ export PINMUX=/sys/kernel/debug/pinctrl/44e10800.pinmux/pinmux-pins
bone$ export PINGROUPS=/sys/kernel/debug/pinctrl/44e10800.pinmux/pingroups

2) Then we executed this to see which pins were unclaimed:

grep "(MUX UNCLAIMED) (GPIO UNCLAIMED)" $PINMUX

3) We saw the free pins with their pin numbers by executing this:

bone$ cd exercises/gpio
bone$ ./freeGPIO

4) We found information about P9_42 by running this:

bone$ ./findGPIO.js P9_16

5) Then we edited the .dts file and added this line:

0x164 0x37  /* P9_42 7  INPUT  MODE7 pullup */

6) We then compiled and made the Overlay active.



In the next part, we explored things related to Debian Releases. This information is contained in 'jessie.txt'
