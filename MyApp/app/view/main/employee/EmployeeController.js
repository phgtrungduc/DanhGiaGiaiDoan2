Ext.define("MyApp.view.main.employee.EmployeeController", {
  extend: "Ext.app.ViewController",
  alias: "controller.Employee",
  dataFilter: null,
  filter: null,
  field: null,
  formatDate: function (date) {
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  },
  init: function () {},
  callOnClick: function () {},
  /**
   *
   * @param {*} firstArg : Đối với ấn vào row trong table thì đây là tham chiếu đến table còn khi ấn vào nút thì đây là tham chiếu đến nút
   * @param {*} secondArg : Đối với ấn vào row trong table thì đây là tham chiếu đến cái row còn khi ấn vào nút thì đây là 1 object Event
   * */
  selectedItem: function (firstArg, secondArg) {
    var me = this;
    // me.getView().setMasked(true);
    var grid = me.getView().down("grid");
    var panel = Ext.create("MyApp.view.main.employee.EmployeeDetail");
    var controller = panel.getController();
    //gọi api tại đây trả về entity, entity sẽ có trường editmode sẽ truyền sang cho con controller hiểu trạng thái xử lí là gì
    if (firstArg.state) {
      if (grid.getSelectionModel().getSelection()[0])
        data = grid.getSelectionModel().getSelection()[0].data;
      switch (firstArg.state) {
        case "delete": {
          if (data) {
            let id = data.EmployeeId;
            Ext.Msg.show({
              width: 500,
              buttonAlign: "right",
              title: "CukCuk - Quản lý nhà hàng",
              msg: "Bạn có chắc muốn xóa nhân viên này không?",
              buttonText: { yes: "Có", cancel: "Hủy bỏ" },
              callback: function (btn) {
                if (btn === "yes") {
                  Ext.ComponentQuery.query(
                    "[xtype='app-main']"
                  )[0].setLoading();
                  try {
                    Ext.Ajax.request({
                      url:
                        "http://localhost:55786/Service/EmployeeService.svc/employee/" +
                        id,
                      method: "POST",
                      success: function (response) {
                        Ext.ComponentQuery.query(
                          "[xtype='app-main']"
                        )[0].setLoading(false);
                        let res = JSON.parse(response.responseText);
                        if (res == "Success") {
                          Ext.Msg.alert(
                            "Thành công",
                            "Xóa nhân viên thành công"
                          );
                          grid.getStore().reload();
                        } else {
                          Ext.Msg.alert("Thất bại", "Xóa nhân viên thất bại");
                        }
                      },
                      failure: function () {
                        Ext.ComponentQuery.query(
                          "[xtype='app-main']"
                        )[0].setLoading(false);
                        Ext.Msg.alert(
                          "Lỗi",
                          "Đã xảy ra lỗi trong khi xóa nhân viên"
                        );
                      },
                    });
                  } catch (error) {
                    Ext.ComponentQuery.query(
                      "[xtype='app-main']"
                    )[0].setLoading(false);
                    Ext.Msg.alert(
                      "Lỗi",
                      "Đã xảy ra lỗi trong khi xóa nhân viên"
                    );
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
          controller.show("edit", data);
          break;
        }
        case "refresh": {
          var grid = Ext.ComponentQuery.query("#grid-employee")[0];
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
    viewModel.setData({ employee: data });
  },
  changeMenuFilter: function (menu, item, e, eOpts) {
    if (menu.xtype=="menu") menu.up("button").setText(item.value);
    var grid = Ext.ComponentQuery.query("#grid-employee")[0];
    var me = this;
    var host = "http://localhost:55786/Service/EmployeeService.svc/employee";
    var columns = grid.columns;
    var where = "";
    let count = 0;
    columns.forEach((column) => {
      let dataIndex = column.dataIndex;
      let value;
      let type;
      let dataType;
      if (column.down().xtype == "panel") {
        dataType = "string";
        let button = column.down("button");
        let textField = column.down("textfield");
        if (textField) {
          type = button.getText();
          value = textField.getValue();
          if (value) value = value.trim();
        }
      } else if (column.down().xtype == "combo") {
        dataType = "number";
        type = "*";
        value = column.down().getValue();
        if (isNaN(value)) value = null;
      }
      if (value) {
        let temp = "";
        if (count >= 1) temp = " AND ";

        if (dataType == "string") {
          if (type == "*") {
            if (!isNaN(value)) {
              let checkDate = new Date(value);
              if (!isNaN(checkDate.getTime()))
                value = this.formatDate(checkDate);
            }
            where += temp + dataIndex + ` like N'%${value}%'`;
          }
          if (type == "=") {
            if (!isNaN(value)) {
              let checkDate = new Date(value);
              if (!isNaN(checkDate.getTime()))
                value = this.formatDate(checkDate);
            }
            where += temp + dataIndex + ` = N'${value}'`;
          }
          if (type == "+") {
            if (!isNaN(value)) {
              let checkDate = new Date(value);
              if (!isNaN(checkDate.getTime()))
                value = this.formatDate(checkDate);
            }
            where += temp + dataIndex + ` like N'${value}%'`;
          }
          if (type == "!") {
            if (!isNaN(value)) {
              let checkDate = new Date(value);
              if (!isNaN(checkDate.getTime()))
                value = this.formatDate(checkDate);
            }
            where += temp + dataIndex + ` not like N'${value}'`;
          }
        }
        if (dataType == "number") {
          where += temp + dataIndex + ` = ${value}`;
        }

        count++;
      }
    });

    if (where) where = "?where=where " + where;
    let uri = host+where;
    grid.getStore().proxy.url = encodeURI(uri);
    grid.getStore().reload();
  },
  textFilterChange: function (textfield, newValue, oldValue) {},
});
