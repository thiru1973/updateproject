

### Select the appropriate Azure subscription, if you have multiple
Select-AzureSubscription -SubscriptionName 'Rapid Cloud';

### Retrieve the Traffic Manager profile (if already created)
$TrafficManagerProfile = Get-AzureTrafficManagerProfile -Name mytfc1;

### Add custom endpoints to the Traffic Manager Profile(Cloud service name)
Add-AzureTrafficManagerEndpoint -TrafficManagerProfile $TrafficManagerProfile -DomainName mybelgaumservice.cloudapp.net -Type CloudService -Status Enabled;

### Commit the changes to your Azure Traffic Manager Profile
Set-AzureTrafficManagerProfile -TrafficManagerProfile $TrafficManagerProfile;