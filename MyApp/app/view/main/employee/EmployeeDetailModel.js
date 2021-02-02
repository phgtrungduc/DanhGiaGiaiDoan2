/**
 * This class is the view model for the Main view of the application.
 */
Ext.define("MyApp.view.main.employee.EmployeeDetailModel", {
  extend: "Ext.app.ViewModel",

  alias: "viewmodel.EmployeeDetailModel",

  data: {
    formData: null,
  },
  // stores: {
  //   employeeStore: {
  //     //  type:"EmployeeDetail"
  //     autoLoad: true,
  //     fields: ["EmployeeCode", "PhoneNumber", "FullName"],
  //     proxy: {
  //       type: "ajax",
  //       url: "https://5fe44f078bf8af001766eea3.mockapi.io/infor/1",
  //       reader: {
  //         type: "json", 
  //         rootProperty: "",
  //       },
  //     },
  //     listeners: {
  //       load: function (store, data, success) {
  //         Ext.ComponentQuery.query("#EmployeeFormDetail")[0]
  //           .getViewModel()
  //           .set("formData", data[0]);
  //       },
  //     },
  //   },
  // },
});
