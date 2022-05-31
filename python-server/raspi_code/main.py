# Import the module that runs the GPIO pins
import RPi.GPIO as gpio

# Import the sleep function for pausing
from time import sleep

# Import the random integer function
from random import randint

# define an array of pins used as leads
charliePins=[7,11,12]

# Define the top and bottom rows as the number of the 
# LED in the list of LEDs to be created.
top=[0,2,4]
bottom=[1,3,5]

# This fuction lights a specif LED.
# The led variable input is a 2 item list,
# each item representing a pin
def lightLED(led):
	#First clear the pins, by setting them all to input
	for pin in charliePins:
		gpio.setup(pin,gpio.IN)
	
	#Now setup the first pin for HIGH OUTPUT
    gpio.setup(led[0],gpio.OUT)
    gpio.output(led[0],gpio.HIGH)
	
	#Now setup the second pin for LOW OUTPUT
    gpio.setup(led[1],gpio.OUT)
    gpio.output(led[1],gpio.LOW)


# Define the array of LEDs.  This is normally done
# by defining each pair separately, but I wanted the code
# to be easy to expand, so I went with this method of
# cycling through the pins and creating the pairs.  It
# has the disadvantage of not making them in order for larger
# sets of pairs, but is easier to maintain, IMO.
charlieLEDS=[]
for i in range(0,len(charliePins)-1):
  for j in range(i+1,len(charliePins)):
    charlieLEDS.append([charliePins[i],charliePins[j]])
    charlieLEDS.append([charliePins[j],charliePins[i]])

# setup the GPIO pins to BOARD mode
gpio.setmode(gpio.BOARD)

#Run the code over and over and over again
while 1:
	# First light them in order
  for led in charlieLEDS:
    lightLED(led)
    sleep(.25)
	# Next flash the top and bottom rows
  for flash in range(0,6):
    for light in range(0,100):
      for led in top:
        lightLED(charlieLEDS[led])
        sleep(.001)
    for light in range(0,100):
      for led in bottom:
        lightLED(charlieLEDS[led])
        sleep(.001)
    
	# Finally, flash them randomly
    for counter in range(0,26):
      lightLED(charlieLEDS[randint(0,5)])
      sleep(.1)