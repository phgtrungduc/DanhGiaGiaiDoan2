Ext.define("MyApp.view.main.repository.RepositoryController", {
  extend: "Ext.app.ViewController",
  alias: "controller.Repository",
  init: function () {},
  /**
   *
   * @param {*} firstArg : Đối với ấn vào row trong table thì đây là tham chiếu đến table còn khi ấn vào nút thì đây là tham chiếu đến nút
   * @param {*} secondArg : Đối với ấn vào row trong table thì đây là tham chiếu đến cái row còn khi ấn vào nút thì đây là 1 object Event
   * */
  selectedItem: function (firstArg, secondArg) {
    var me = this;
    // me.getView().setMasked(true);
    var grid = me.getView().down("grid");
    var panel = Ext.create("MyApp.view.main.repository.RepositoryDetail");
    var controller = panel.getController();
    //gọi api tại đây trả về entity, entity sẽ có trường editmode sẽ truyền sang cho con controller hiểu trạng thái xử lí là gì
    if (firstArg.state) {
      if (grid.getSelectionModel().getSelection()[0])
        data = grid.getSelectionModel().getSelection()[0].data;
      switch (firstArg.state) {
        case "delete": {
          if (data) {
            let id = data.RepositoryId;
            Ext.Msg.show({
              width: 500,
              buttonAlign: "right",
              title: "CukCuk - Quản lý nhà hàng",
              msg: "Bạn có chắc muốn xóa kho này không?",
              buttonText: { yes: "Có", cancel: "Hủy bỏ" },
              callback: function (btn) {
                if (btn === "yes") {
                  Ext.ComponentQuery.query(
                    "[xtype='app-main']"
                  )[0].setLoading();
                  try {
                    Ext.Ajax.request({
                      url:
                        "http://localhost:55786/Service/RepositoryService.svc/repository/" +
                        id,
                      method: "POST",
                      success: function (response) {
                        Ext.ComponentQuery.query(
                          "[xtype='app-main']"
                        )[0].setLoading(false);
                        let res = JSON.parse(response.responseText);
                        if (res == "Success") {
                          Ext.Msg.alert("Thành công", "Xóa kho thành công");
                          grid.getStore().reload();
                        } else {
                          Ext.Msg.alert("Thất bại", "Xóa kho thất bại");
                        }
                      },
                      failure: function () {
                        Ext.ComponentQuery.query(
                          "[xtype='app-main']"
                        )[0].setLoading(false);
                        Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi trong khi xóa kho");
                      },
                    });
                  } catch (error) {
                    Ext.ComponentQuery.query(
                      "[xtype='app-main']"
                    )[0].setLoading(false);
                    Ext.Msg.alert("Lỗi", "Đã xảy ra lỗi trong khi xóa kho");
                  }
                } else if (btn === "cancle") {
                  this.close();
                }
              },
            });
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
          debugger;
          controller.show("edit", data);
          break;
        }
        case "refresh": {
          var grid = Ext.ComponentQuery.query("#grid-repository")[0];
          grid.getStore().reload();
        }
        case "clone": {
          if (data) {
            controller.show("add", data);
          } else {
            Ext.Msg.alert(
              "Thông báo",
              "Chưa có bất kì dòng nào được chọn!",
              Ext.emptyFn
            );
          }
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
  clickRow: function (grid, cellElement, rowIndex, cellIndex, e) {
    var selectedRec = grid.getSelectionModel().getSelected();
    var data = selectedRec.items[0].data;
    var extra = Ext.ComponentQuery.query("#ExtraInfor")[0];
    var viewModel = extra.getViewModel();
    viewModel.setData({ repository: data });
  },
  changeMenuFilter: function (menu, item, e, eOpts) {
    menu.up("button").setText(item.value);
    this.getView().down("gridpanel").getStore().filter({
      property: "FullName",
      value: "Reta Perch",
      exactMatch: true,
      caseSensitive: true,
    });
  },
  hideView: function (menu, item, e, eOpts) {
    console.log(Ext.getCmp("hideview"));
    Ext.getCmp("hideview").setVisible(true);
  },
  setMasked: function () {
    this.getView().setMasked({
      xtype: "loadmask",
      indicator: true,
      message: "Loading...",
    });
  },
});
