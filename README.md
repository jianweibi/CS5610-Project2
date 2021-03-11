# CS5610-Project 2

[Story] - An Anonymous Story Sharing Platform  
Website: https://storysharing.azurewebsites.net/

## Author

- Yuchen Xie (xie.yuch@northeastern.edu)
- Zhi Wen (wen.zhi@northeastern.edu)

## Class Link

CS5610 Web Development: https://johnguerra.co/classes/webDevelopment_spring_2021/

## Project Objective

To build an anonymous story sharing platform, allowing users to share any kind of story and pictures.

# Introduction

## Screenshot
![](https://raw.githubusercontent.com/Yuchen112211/CS5610-Project2/main/public/img/screenshot-storysharing.png)

## Slides

[Google Slides](https://docs.google.com/presentation/d/1IbfWF4KVDLNV8igV6sQoc9Q80V2sBHJblvoP0uRPrCo/edit?usp=sharing)

## Video demo

[Demo](https://youtu.be/uc3gEe3e8gc)

# Instructions to build

1. Run the following command to download the source code:

   ```
   git clone https://github.com/Yuchen112211/CS5610-Project2.git
   ```

2. Use npm to install dependencies:

   ```
   npm install
   ```

3. Add your local .env file to contain your MongoDB url
  - In .env file, at least add DB_URL
    ```
    DB_URL=mongodb+srv://username:password@.....
    ```

4. Start the server:
   ```
   npm start
   ```

# References

- Code style: [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- Project structure: [express/examples/mvc](https://github.com/expressjs/express/tree/master/examples/mvc)
- UI: [Now UI Kit](https://github.com/creativetimofficial/now-ui-kit)
