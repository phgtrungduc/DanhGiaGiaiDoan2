Ext.define("MyApp.store.Customer", {
  extend: "Ext.data.Store",
  alias: "store.Customer",
  itemId: "Customer",
  storeId: "Customer",
  model: "MyApp.model.Customer",
  data: {
    items: null,
  },
  proxy: {
    type: "ajax",
    url: "http://localhost:55786/Service/CustomerService.svc/customer",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total",
    },
  },
  autoLoad: true,
  pageSize: 25,
});
