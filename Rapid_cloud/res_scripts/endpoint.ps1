$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "resGpEndpoint"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("ep_id",1)
$results = $collection.FindOne($query)

#Write-Host $results[2]

$Username = $results[2]
$Password = $results[3]
$resName = $results[4]
$location = $results[5]
$pfName = $results[6]
$tfrtMethod = $results[7]
$dns = $results[8]
$ttl = [convert]::ToInt32($results[9], 10)
$protocol = $results[10]
$port = [convert]::ToInt32($results[11], 10)
$path = $results[12]
$epName = $results[13]
$epType = $results[14]
$epStatus = $results[15]
$webappName = $results[16]



$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$profile = New-AzureRmTrafficManagerProfile -Name $pfName -ResourceGroupName $resName -TrafficRoutingMethod $tfrtMethod -RelativeDnsName myterstapp -Ttl $ttl -MonitorProtocol $protocol -MonitorPort $port -MonitorPath $path

$webapp1 = Get-AzureRMWebApp -Name "testrapid"

Write-Host $webapp1.Id 

Add-AzureRmTrafficManagerEndpointConfig -EndpointName $epName -TrafficManagerProfile $profile -Type $epType -TargetResourceId $webapp1.Id -EndpointStatus $epStatus

Set-AzureRmTrafficManagerProfile -TrafficManagerProfile $profile 
