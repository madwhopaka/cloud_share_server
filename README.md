# cloud_share_server
This is the backend server for cloud share.
Cloud Share is a website which helps you share your files through the cloud. 
You need to upload the file to share, and then you will get a url link which you can share with your friend. 
You friend can open the link and download the file from there. 


If you are planning to fork this or run this : 

1. Download the root folder, run the command "npm install" in the to install the dependency modules. 
2. then to run the server : run the command "npm run dev". On this command, the server is run using nodemon
3. Also you'll need to do some tweaks here and there: 
            You'll have the .env file in the root folder which has some environment variable which you need to fill in such as APP_BASE_URL, then some credentials for the modemailer host, auth ,etc.  
4. Note this is just the backend server for a file sharing website, also I have used MONGO DB for database. So you will have to configure your database and connect it.
Read it here: "https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database".
5. What this server does is acts as a custom API : 


There are 3 routes : 
              1. /api/files which takes in a POST request with a file that the user wants to share, and stores and saves it on the server as well as the database.
                 It assigns the file with uuid, and generates link for the file (with the uuid included) on the server and sends it to the frontend as response.
              2. /files/:uuid , this is a dynamic route with GET request, which takes in the uuid from the url link , checks if file with that uuid is available on the server, renders the download page if no error. 
                 You'll have the download button in the download page which gives you url link to the file on ther server for download.
              3. /files/download/:uuid this is another dynamic route with GET request, which also takes in the uuid from the url params, checks if the file is there on the server, if there it sends as response and downloads it for the users.
              4. /api/files/send with POST request, takes the uuid of the file, the sender and recipent's email ids and sends an email to the recipient using nodemailer and sendinblue as the smtp host. 
                 To make this route work : Create an account on sendinblue, go to SMTP from the menu, fill in the credentials cited on the SMTP tab in the .env file.

I hope this helped. If you have any doubts, you can mail me at madhupaka11@gmail.com. 
Also you can the find the frontend for this project at github.com/madwhopaka/fileport
              
