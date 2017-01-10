$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "getVms"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

$query = new-object MongoDB.Driver.QueryDocument("vm_id",1)
$results = $collection.FindOne($query)
$Username = $results[3]
$Password = $results[4]
$project = $results[5]
$pd_id = $results[6]

$MyServer = "172.29.59.63";
$MyPort = "5432";
$MyDB = "Rapid";
$MyUid = "postgres";
$MyPass = "cloud123"
$conn = New-Object System.Data.Odbc.OdbcConnection
$conn.ConnectionString = "Driver={PostgreSQL UNICODE(x64)};Server=$MyServer;Port=$MyPort;Database=$MyDB;Uid=$MyUid;Pwd=$MyPass;"

function Set-ODBC-Data{
	   param([string]$query=$(throw 'query is required.'))
	   $cmd = new-object System.Data.Odbc.OdbcCommand($query,$conn)
	   $conn.open()
	   $cmd.ExecuteNonQuery()
	   $conn.close()
	}
	
if($results[2] -eq "Azure"){
	$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
	$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword
	Add-AzureRmAccount -Credential $Credential

	$smvms=Get-AzureVM
	$rmvms=Get-AzurermVM 
	$vmarray = @() 
	foreach ($vm in $smvms) 
	{ 
		$vmarray += New-Object PSObject -Property @{` 
		Subscription=$Subscription.SubscriptionName;`
		AzureMode="Service_Manager";`
		Name=$vm.InstanceName;`
		PowerState=$vm.PowerState;`
		ServiceName=$vm.ServiceName;`
		Type = "Classic";`
		Location = $vm.Location;`
		Size=$vm.InstanceSize} 
	}
	foreach ($vm in $rmvms) 
	{     
		# Get status (does not seem to be a property of $vm, so need to call Get-AzurevmVM for each rmVM) 
		$vmstatus = Get-AzurermVM -Name $vm.Name -ResourceGroupName $vm.ResourceGroupName -Status  

		# Add values to the array: 
		$vmarray += New-Object PSObject -Property @{` 
			Subscription=$Subscription.SubscriptionName; ` 
			AzureMode="Resource_Manager"; ` 
			ServiceName=$vm.ResourceGroupName;`
			Type = "resGroup";`
			Name=$vm.Name;Location = $vm.Location; PowerState=(get-culture).TextInfo.ToTitleCase(($vmstatus.statuses)[1].code.split("/")[1]); ` 
			Size=$vm.HardwareProfile.VirtualMachineSize}
	}
	foreach ($res in $vmarray)
	{
		$name = $res.Name;
		$serName = $res.ServiceName;
		$cname = "Azure";
		$ename = "Other";
		$type = $res.Type;
		$query = "select cloud_name from deployment_env_sync where cloud_name = '"+ $serName + "' and inst_type = '" + $name +"'";
		$conn.open()
		$cmd = New-object System.Data.Odbc.OdbcCommand($query,$conn)
		$ds = New-Object system.Data.DataSet
		(New-Object system.Data.odbc.odbcDataAdapter($cmd)).fill($ds) | out-null
		$conn.close()
		$emplyID = @() 
		$emplyID = $ds.tables.select();
		#Write-Host $emplyID.length
		if($emplyID.length -eq 0)
		{
			 Write-Host "True"
			 $query = "INSERT INTO deployment_env_sync (prov_id,region,env_name,p_name,p_id,inst_type,inst_id,role,status,cloud_name,type) VALUES ('"+ $cname + "','" + $res.Location + "', '" + $ename + "', '" + $project + "', '" + $pd_id + "','" + $name + "','" + $name + "','" + $name + "','" + $res.PowerState + "','" + $res.ServiceName + "','" + $type + "')" 
			 set-odbc-data -query $query
		}else{
			 Write-Host "False"
			 
		}
	}
}else{
	$regions = @("us-east-1","us-east-2","us-west-1","eu-west-1","eu-central-1","ap-southeast-1","ap-southeast-2","ap-northeast-1","sa-east-1")
	$cname = "AWS";
	$ename = "Other";
	foreach ($reg in $regions){
		$Instances = (Get-EC2Instance -AccessKey $Username -SecretKey $Password -Region $reg).instances
		if($Instances.length -ne 0){
			foreach($inst in $Instances){
				#Write-Host $inst.InstanceId
				#Write-Host $inst.InstanceType
				#Write-Host $inst.State.Name
				#Write-Host $inst.VpcId
				#Write-Host $inst.Tags.Value
				$query = "select cloud_name from deployment_env_sync where vpc_name = '"+ $inst.VpcId + "' and inst_id = '" + $inst.InstanceId +"'";
				$conn.open()
				$cmd = New-object System.Data.Odbc.OdbcCommand($query,$conn)
				$ds = New-Object system.Data.DataSet
				(New-Object system.Data.odbc.odbcDataAdapter($cmd)).fill($ds) | out-null
				$conn.close()
				$emplyID = @() 
				$emplyID = $ds.tables.select();
				#Write-Host $emplyID.length
				if($emplyID.length -eq 0)
				{
					$query = "INSERT INTO deployment_env_sync (prov_id,region,env_name,p_name,p_id,inst_type,inst_id,role,status,vpc_name,type) VALUES ('"+ $cname + "','" + $reg + "', '" + $ename + "', '" + $project + "', '" + $pd_id + "','" + $inst.InstanceType + "','" + $inst.InstanceId + "','" + $inst.Tags.Value + "','" + $inst.State.Name + "','" + $inst.VpcId + "','" + $cname + "')" 
					set-odbc-data -query $query
				}else{
					Write-Host "False"
					 
				}
				
			}
		}
	}
}
