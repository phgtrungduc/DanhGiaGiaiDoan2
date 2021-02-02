Ext.define('MyApp.view.Viewport',{
    extend:'Ext.container.Viewport',
    id:'viewport',
    items:[
        {
            region:'north',
            html:'<h1>Header part</h1>'
        },
        {
            region:'center',
            xtype:'container',
            activeTab:0,
            itemId:'viewport-target',
            items:[
                {
                    xtype:"employee"
                }
            ]
        },
        // {
        //     region:'south',
        //     html:'<h1>footer part</h1>'
        // }
    ]
});