$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "subscription"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

$query = new-object MongoDB.Driver.QueryDocument("s_id",1)
$results = $collection.FindOne($query)

$Username = $results[3]
$Password = $results[4]
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword
Add-AzureRmAccount -Credential $Credential

$MyServer = "172.29.59.63";
$MyPort = "5432";
$MyDB = "Rapid";
$MyUid = "postgres";
$MyPass = "cloud123"
$conn = New-Object System.Data.Odbc.OdbcConnection
$conn.ConnectionString = "Driver={PostgreSQL UNICODE(x64)};Server=$MyServer;Port=$MyPort;Database=$MyDB;Uid=$MyUid;Pwd=$MyPass;"


$sub = Get-AzureRmSubscription
function Set-ODBC-Data{
   param([string]$query=$(throw 'query is required.'))
   $cmd = new-object System.Data.Odbc.OdbcCommand($query,$conn)
   $conn.open()
   $cmd.ExecuteNonQuery()
   $conn.close()
}
Get-AzureRmSubscription | foreach-object {
	$account = $results[2]
	$prvd = $results[5]
    $SName = $_.SubscriptionName
	$TId = $_.TenantId
	$State = $_.State
	$SId = $_.SubscriptionId
	$query = "INSERT INTO subscription(accountid,provider, subscription_name, subscription_id) VALUES ('"+ $account + "', '" + $prvd + "', '" + $SName + "', '" + $SId + "')" 
	set-odbc-data -query $query
	
}