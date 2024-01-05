docker build -t paperlist-fe . 
docker run --name=paperlist-fe-container -d -p 5173:5173 paperlist-fe
