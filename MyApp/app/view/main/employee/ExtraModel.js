Ext.define("MyApp.view.main.employee.ExtraEmployee", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.ExtraEmployee",
  data: {
    employee: null,
  },
  // stores: {
  //   employeeStore: {
  //     // //  type:"EmployeeDetail"
  //     // autoLoad: true,
  //     proxy: {
  //       type: "ajax",
  //       url: "http://localhost:55786/Service/EmployeeService.svc/employee/82a08c10-83bc-4d3f-8c67-00b1674450f6",
  //       // reader: {
  //       //   type: "json",
  //       //   rootProperty: "employee",
  //       // },
  //       // extraParams: {
  //       //   param: "82a08c10-83bc-4d3f-8c67-00b1674450f6",
  //       // },
  //     },
  //     listeners: {
  //       load: function (store, data, success) {
  //         Ext.ComponentQuery.query("#ExtraInfor")[0]
  //           .getViewModel()
  //           .set("employee", data[0]);
  //       },
  //     },
  //   },
  // },
});
