/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

   

    title: 'Personnel',

    store: {
        type: 'Employee'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'Email', flex: 1 },
        { text: 'PhoneNumber', dataIndex: 'PhoneNumber', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
