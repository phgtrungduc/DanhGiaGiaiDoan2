Ext.define("MyApp.view.main.TabFooter", {
    extend: "Ext.container.Container",
    xtype:"tabfooter",
    items: [
        {
            title: 'Home',
            html: 'Home Screen'
        },
        {
            title: 'Contact',
            html: 'Contact Screen'
        }
    ]
});
