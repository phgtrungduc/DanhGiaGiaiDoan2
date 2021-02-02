Ext.define("MyApp.view.main.employee.CustomerController", {
  extend: "Ext.app.ViewController",
  alias: "controller.Customer",
  init: function () {},
  /**
   *
   * @param {*} firstArg : Đối với ấn vào row trong table thì đây là tham chiếu đến table còn khi ấn vào nút thì đây là tham chiếu đến nút
   * @param {*} secondArg : Đối với ấn vào row trong table thì đây là tham chiếu đến cái row còn khi ấn vào nút thì đây là 1 object Event
   * */
  selectedItem: function (firstArg, secondArg) {
    var me = this;
    var grid = me.getView().down("grid");
    var panel = Ext.create("MyApp.view.main.customer.CustomerDetail");
    var controller = panel.getController();
    //gọi api tại đây trả về entity, entity sẽ có trường editmode sẽ truyền sang cho con controller hiểu trạng thái xử lí là gì
    if (firstArg.state) {
      if (grid.getSelectionModel().getSelection()[0]) data = grid.getSelectionModel().getSelection()[0].data;
      switch (firstArg.state) {
        case "delete": {
          if (data) {
            let id = data.CustomerId;
            try {
              Ext.Msg.show({
                width: 500,
                buttonAlign: "right",
                title: "CukCuk - Quản lý nhà hàng",
                msg: "Bạn có chắc muốn xóa khách hàng này không?",
                buttonText: { yes: "Có", cancel: "Hủy bỏ" },
                callback: function (btn) {
                  if (btn === "yes") {
                    try {
                      Ext.ComponentQuery.query("[xtype='app-main']")[0].setLoading();
                      Ext.Ajax.request({
                        url:
                          "http://localhost:55786/Service/CustomerService.svc/customer/" +
                          id,
                        method: "POST",
                        success: function (response) {
                          Ext.ComponentQuery.query("[xtype='app-main']")[0].setLoading(false);
                          let res = JSON.parse(response.responseText);
                          if (res == "Success") {
                            Ext.Msg.alert(
                              "Thành công",
                              "Xóa khách hàng thành công"
                            );
                            grid.getStore().reload();
                          } else {
                            Ext.Msg.alert(
                              "Thất bại",
                              "Xóa khách hàng thất bại"
                            );
                          }
                        },
                        failure: function () {
                          Ext.ComponentQuery.query("[xtype='app-main']")[0].setLoading(false);
                          Ext.Msg.alert(
                            "Lỗi",
                            "Đã xảy ra lỗi trong khi xóa khách hàng"
                          );
                        },
                      });
                    } catch (error) {
                      Ext.ComponentQuery.query("[xtype='app-main']")[0].setLoading(false);
                      Ext.Msg.alert(
                        "Lỗi",
                        "Đã xảy ra lỗi trong khi xóa khách hàng" + error
                      );
                    }
                    
                  } else if (btn === "cancle") {
                    this.close();
                  }
                },
              });
            } catch (e) {
              Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi trong khi xóa khách hàng");
            }
          } else {
            Ext.Msg.alert(
              "Thông báo",
              "Chưa có bất kì dòng nào được chọn!",
              Ext.emptyFn
            );
          }
          break;
        }
        case "add": {
          controller.show("add");
          break;
        }
        case "see": {
          controller.show("see", data);
          break;
        }
        case "edit": {
          controller.show("edit", data);
          break;
        }
        case "clone": {
          if (data){
            controller.show("add",data);
          }else {
            Ext.Msg.alert(
              "Thông báo",
              "Chưa có bất kì dòng nào được chọn!",
              Ext.emptyFn
            );
          }
          break;
        }
        default:
          break;
      }
    } else {
      var selectedRec = firstArg.getSelectionModel().getSelected();
      var data = selectedRec.items[0].data;
      controller.show(null, data);
    }
  },
  changeMenuFilter: function (menu, item, e, eOpts) {
    menu.up("button").setText(item.value);
    debugger
  },
});
