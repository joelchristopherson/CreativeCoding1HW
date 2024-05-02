Final Project - README.md

The purpose of this Readme.md is to describe and document the process of my project over its entire life cycle. It covers the final product, its iterations, successes, failures, lessons that I learned, and the sources and guides that helped me to complete the project.

# Life Cycle of the Project
1. The first major step I took after creating my project proposal was to set up my final project folder on GitHub. 
2. Once the folder was created, I set up my html file which proved to be hard than I thought. The main struggle was deciding between whether to referenece the p5.js files I needed either locally or using a CDN. After struggling with the local copies of p5.js on my computer, I ultimately decided that using a CDN would be the better option, as there is less file management involved.
3. Once the html was setup I created my js sketch file in which I would do the majority of my coding.
    - To start, I focused on the canvas, loading in one song, and making the song play and pause.
4. Next, I started working on my first visualization. I had to do lots of research, but ultimately learned that using a waveform and a Fast Fourier Transform (FFT) would be a great start to getting the visualization to sync with the audio.
5. Now that I had a basic waveform, I wanted to experiment with how to make it look a little more visually appealing, which included introducing color and mirroring the waveform to make it look more cohesive.
6. After creating the first waveform, I wanted to work on my second one. I learned how to turn that original waveform into a circle, using some math and a for loop to mirror the first half of the circle. I will touch more on this in the Successes and Failures Section.
7. Once I had the first two visualizations, I started to work on two things. Uploading more than one song and creating drop down menus for both the songs and the visualizations. I ended up using a loop to pick through me songs array and a switch case to choose from the three different visualizations.
8. Once I had the menus figured out I worked on the third visualization which was the spectrum visualization, but quickly turned into the speaker visualization, when I got some feedback from one of my buddies who is also a Management Information Systems major.
9. After the final visualization was finished, I focused on the more information button where I included information on how to use the application, song credits for the artists, and the name of my application.
10. To wrap things up I added about 5 more songs and did some rigorous testing. The main things I tested included:
    - All songs in the program
    - All songs with all visualizations
    - Play and pause button on all the songs
    - Switching songs while the current song was either playing and paused
    - Accessing the more information menu during the songs

# Successes
- Dynamic visualization selection: I implemented the ability for users to switch between multiple visualization modes (Circle Visualization, Linear Waveform, Speaker Visualization) and I made it possible to switch during songs.
- Real-time Audio Analysis: I used Fast Fourier Transform (FFT) for real-time audio analysis, which adjusts each of the visualizations based on the frequency data of the playing song.
- Particle System for Visualization: I made a particle system where particles react to the music's amplitude, providing a cool visual experience for the users. This was definitely the hardest part of the project.
- Responsive UI Elements: I added responsive UI elements like dropdowns for song and visualization selection and buttons for playback control, which made the application a lot more user-friendly. (I used css to help with formatting)
- Help Information: I included a help button that provides users with instructions and song credits for the artists.

# Failures
- Volume Control Implementation: I was unable to implement the planned volume slider control, which would have allowed users to adjust the playback volume directly from the interface. I figured most users have control of the volume on their device, so I might save some time by leaving this out.
- Repetitive Debugging: I spent tooooooo much time fixing and refining the same functionalities, which slowed overall project progress. Sometimes I would get a black line in the middle of my circular visualization even though I hadn't changed the code for it.
- Logic Errors: I had frequent logic errors that required substantial troubleshooting. The biggest example coming from when it came time to introduce multiple visualization as I had worked on the first one in the draw function, instead of its own function.
- Code Optimization: I struggled with making the code more concise, but this is something that I believe I have improved on since I took app development in the College of Business.

# What I Learned
- Markdown: I learned a lot more about writing in Markdown.
- HTML Setup: I learned more about setting up HTML files, including how to structure and link various resources. The newest thing for me is utilizing a cdn instead of local copies of p5.
- FFT and Waveforms: I learned about Fast Fourier Transforms (FFT) and waveforms, applying these concepts help me to analyze audio signals and create dynamic visualizations for this project.
- CSS Utilization: I improved my skills in CSS for styling, learning to control the layout and visual aspects of p5.js.
- IDs vs. Classes: I learned more about the differences between IDs and classes, which helped me organize and style elements in my project.
- Object-Oriented Programming: I expanded my understanding of objects and methods in JavaScript. Prior to this class I took App Development in the College of Business because I am an MIS major. After that I became a T.A. in App Development when it switch to C#.
- Passion for Coding: This project reinforced my enjoyment of coding, especially when working on something I am passionate about. I am sad I did not pursue more coding classes while at UM, but am excited to start a career in IT Compliance, who knows maybe one day I will end up as a programmer.

# Sources and Helpful Guides
- https://p5js.org/reference/#/p5.FFT
- https://p5js.org/reference/#/p5.FFT/waveform
- https://p5js.org/reference/#/p5/ellipse
- https://editor.p5js.org/kiko_QICHEN/sketches/sf_FdCgCX
- https://www.reddit.com/r/p5js/comments/ynr0sw/is_it_possible_to_make_a_visualizer_in_p5_that/
- https://p5js.org/reference/#/p5/createSelect