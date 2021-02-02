Ext.define("MyApp.store.Employee", {
  extend: "Ext.data.Store",
  alias: "store.Employee",
  itemId: "Employee",
  storeId: "Employee",
  model: "MyApp.model.Employee",
  data: {
    items: null,
  },
  proxy: {
    type: "ajax",
    url: "http://localhost:55786/Service/EmployeeService.svc/employee",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total",
    },
  },
  autoLoad: true,
  pageSize: 25,
});
