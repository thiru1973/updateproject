
echo "STOPPING Environment"

aws ec2 stop-instances --instance-ids i-0662382776da732eb

echo "STOPPED ENVIRONMENT"
exit 1