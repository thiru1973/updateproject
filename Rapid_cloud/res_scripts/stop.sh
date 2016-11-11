#!/bin/sh
#export JAVA_HOME='C:\Program Files\Java\jre7'
#export EC2_HOME='C:\ec2-api-tools\ec2-api-tools-1.7.5.1'

#export PATH=$PATH:$EC2_HOME/bin

#export AWS_ACCESS_KEY='AKIAJTPQAUMPWKMM7ENA'
#export AWS_SECRET_KEY='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'
#export EC2_URL='https://ec2.us-east-1.amazonaws.com'

echo "STOPPING Environment"

aws ec2 stop-instances --instance-ids i-0662382776da732eb

echo "STOPPED ENVIRONMENT"
exit 1