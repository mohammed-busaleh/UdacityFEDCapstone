# Travel Planner
## App Summary

This application take the user start and end dat fro trip to a city. This application will generate an image of teh location and the forcast for these dates. 
I tried to make this app as manimal as possible. I used the Project#4 as a startup code and went from there.

# Project Use Instructions

1. Download the zip file .
2. open command line .
3. go to project directory after unzipping it .
4. ```npm install``` .
5. ```npm run build-dev``` .
6. in a seprated terminal run npm start .

## APIs Used

1. Pixabay .
2. GeoNames .
3. WeatherBit .

## Application Error Handling 
There is an error handling on both backend requests and frontend level. The application check teh folowing:
#### Fronted side (Alert error):
- checks if the start date after the leave date .
- checks if one of the dates does not have value .
#### backend side(Graphical error):
- if the city name is in correct or the APIs does not have it.
### Sample of The Application 

![alttext](https://github.com/mohammed-busaleh/UdacityFEDCapstone/blob/master/ProjSample%231.jpg)
![alttext](https://github.com/mohammed-busaleh/UdacityFEDCapstone/blob/master/ProjSample%232.jpg)
![alttext](https://github.com/mohammed-busaleh/UdacityFEDCapstone/blob/master/ProjSample%233.jpg)
![alttext](https://github.com/mohammed-busaleh/UdacityFEDCapstone/blob/master/ProjSample%234.jpg)
