# Precise Timer
This package provides a way to have a precise interval timer for Node.js which is accurate upto 1ms.

## Install
    npm install custom-precise-timer

## Usage Example:

    const timer = new PreciseTimer(() => {
      console.log('clicker');
    }, 2000);

    <!-- To Start the timer -->
    timer.start()

    <!-- To stop the timer -->
    timer.stop()

------------------------

    <!-- With options -->


    let options = { 
      immediate: true,
      errorCallback: () => {
        console.error('Error')
      }
    };

    const timer2 = new PreciseTimer(() => {
      console.log('clicker');
    }, 2000, options);

    <!-- To Start the timer -->
    timer2.start()

    <!-- To stop the timer -->
    timer2.stop()


