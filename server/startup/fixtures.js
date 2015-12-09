/**
 * Created by adm9360 on 10/12/2015.
 */

//Applications.remove({});

if(Applications.find().count() === 0)
{
    Applications.insert({
        id: 1,
        name: 'HUB',
        description: 'hub'
    });

    Applications.insert({
        id: 2,
        name: 'BDS',
        description: 'bds'
    });

    Applications.insert({
        id: 3,
        name: 'CRS',
        description: 'crs'
    });

    Applications.insert({
        id: 4,
        name: 'IB',
        description: 'ebanking'
    });

    Applications.insert({
        id: 5,
        name: 'PB',
        description: 'Phone Banking'
    });

    Applications.insert({
        id: 6,
        name: 'BER',
        description: 'ber'
    });

    Applications.insert({
        id: 7,
        name: 'CRD',
        description: 'credit app'
    });

    Applications.insert({
        id: 8,
        name: 'XYZ',
        description: 'The Alphabet'
    });

    Applications.insert({
        id: 9,
        name: 'LINX',
        description: 'Smells nice'
    });

    Applications.insert({
        id: 10,
        name: 'RFS',
        description: 'rfs'
    });

    Applications.insert({
        id: 11,
        name: 'PETS',
        description: 'pets'
    });

    Applications.insert({
        id: 12,
        name: 'ACS',
        description: 'Acs'
    });

    Applications.insert({
        id: 13,
        name: 'Odd',
        description: 'Bod'
    });
}

if(Environments.find().count() > 0)
{
    Environments.remove({});
}


if(Environments.find().count() === 0)
{
    //Environments.loadFromAPI();
    //var env = EmaGatewayAPI.getEnvironments();
    //this.unblock();
    var env = Meteor.http.call("GET", "http://localhost:10010/ema/env", function(err, result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            _.each(result.data, function(environment){
                Environments.insert(environment);
            });
        }

    });

}

if(HublogsSlogans.find().count() === 0)
{
    HublogsSlogans.insert({
        id: 1,
        description: 'Searches are on us'
    });

    HublogsSlogans.insert({
        id: 2,
        description: 'Your\'ve won a power search'
    });
    HublogsSlogans.insert({
        id: 3,
        description: 'Let us find it for you'
    });
}

if(HubLogs.find().count() > 0)
{
    HubLogs.remove({});
}

if(HubLogs.find().count() === 0)
{
    // adds an index to make sorting by the 'id' property quicker
    HubLogs._ensureIndex({
        id: 1
    });

    //// adds 1000 documents to 'items' collection
    //for (var i = 1; i < 1001; i++) {
    //    HubLogs.insert({
    //        LOG_ID: i,
    //        text: 'Hello from item #' + i + '!'
    //    });
    //}

    HubLogs.insert(
        {
            id: 1,
            REQUESTID: 982962,
            MESSAGEID: 'g',
            REQSERVICEID: 852862,
            DATEOFLOG: '2015-12-06',
            BRAND: 'g',
            APPCODE: 'g',
            APPNAME: 'g',
            REGION: 'g',
            USERID: 'g',
            REQMESSAGE: 'g',
            SERVICEID: 255,
            SERVICENAME: 'g',
            SEVERITY: 'g',
            LOGCODE: 1000082,
            LOGTEXT: 'g',
            SOURCENAME: 'g',
            PROVIDER: 'g',
            LOGMESSAGE: 'g',
            THUNDERHEADCONTENT: 'g'
        });

    HubLogs.insert({
        id: 2,
        REQUESTID: 982963,
        MESSAGEID: 'g',
        REQSERVICEID: 852863,
        DATEOFLOG: '2015-12-06',
        BRAND: 'g',
        APPCODE: 'g',
        APPNAME: 'g',
        REGION: 'g',
        USERID: 'g',
        REQMESSAGE: 'g',
        SERVICEID: 245,
        SERVICENAME: 'g',
        SEVERITY: 'g',
        LOGCODE: 1000082,
        LOGTEXT: 'g',
        SOURCENAME: 'g',
        PROVIDER: 'g',
        LOGMESSAGE: 'g',
        THUNDERHEADCONTENT: 'g'
    });
}
