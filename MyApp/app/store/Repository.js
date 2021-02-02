Ext.define("MyApp.store.Repository", {
    extend: "Ext.data.Store",
    alias: "store.Repository",
    itemId: "Repository",
    storeId: "Repository",
    model: "MyApp.model.Repository",
    data: {
      items: null,
    },
    proxy: {
      type: "ajax",
      url: "http://localhost:55786/Service/RepositoryService.svc/repository",
      reader: {
        type: "json",
        rootProperty: "items",
        totalProperty: "total",
      },
    },
    autoLoad:true,
    pageSize: 25,
  });
  