/**
 * Created by adm9360 on 10/12/2015.
 */


if(Applications.find().count() > 0)
{
    Applications.remove({});
}


if(Applications.find().count() === 0)
{
    Applications._ensureIndex({
        ID: 1
    });
    Applications.loadFromDataSource();
}

if(Environments.find().count() > 0)
{
    Environments.remove({});
}

if(Environments.find().count() === 0)
{
    Environments._ensureIndex({
        ID: 1
    });
    Environments.loadFromDataSource();
}

if(HublogsSlogans.find().count() > 0)
{
    HublogsSlogans.remove({});
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
    HublogsSlogans.insert({
        id: 4,
        description: 'Im feeling lucky'
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
        LOG_ID: 1
    });
    HubLogs.loadFromDataSource();
}


