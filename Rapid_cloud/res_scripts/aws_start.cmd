echo "Starting Environment" 

set JAVA_HOME='C:\Program Files\Java\jre7'
set EC2_HOME='C:\ec2-api-tools\ec2-api-tools-1.7.5.1'

set PATH=$PATH:$EC2_HOME\bin

ec2-start-instances i-0074c3aaa6a0340f2 -O AKIAJTPQAUMPWKMM7ENA -W bz63vl53gNM9oDZxbhqEwq7vfyOpeId8qvITXin7 --region us-east-1

echo "STARTED ENVIRONMENT"

exit 1