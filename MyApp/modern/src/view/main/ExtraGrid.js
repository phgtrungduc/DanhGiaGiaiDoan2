Ext.define("MyApp.view.main.ExtraGrid", {
  extend: "Ext.grid.Grid",
  xtype: "extra",
  title: "grid test",
  store: { type: "extra" },
  columns: [
    {
      text: "Tên đăng nhập",
      dataIndex: "username",
      flex: 1,
      layout: "hbox",
      defaults: {
        labelStyle: "padding-left:10px;",
      },
      items: [
        {
          xtype: "button",
          text: "*",
          flex: 1,
          cls: "m-btn",
          arrowAlign: "left",
          style: {
            "background-color": "#ffffff",
            color: "black",
          },
          menu: [
            { text: "* : Chứa" },
            { text: "= : Bằng" },
            { text: "+ : Bắt đầu bằng" },
            { text: "- : Kết thúc bằng" },
            { text: "! : Không chứa" },
          ],
          // listeners: {
          //   click: function () {
          //     Ext.Msg.alert("Success!", "We have been rendered");
          //   },
          // },
        },
        {
          xtype: "textfield",
          flex: 3,
        },
      ],

      menuDisabled: true,
      sortable: false,
    },
    {
      text: "Tên nhân viên",
      dataIndex: "name",
      flex: 1,
      menuDisabled: true,
      sortable: false,
      layout: "hbox",
      columnWidth: 0.7
    },
    {
      text: "Số điện thoại",
      dataIndex: "phone",
      layout: "hbox",
      flex: 1,
      menuDisabled: true,
      sortable: false,
      items: [
        {
          xtype: "button",
          text: "*",
          flex: 1,
          arrowAlign: "left",
          menu: [
            { text: "* : Chứa" },
            { text: "= : Bằng" },
            { text: "+ : Bắt đầu bằng" },
            { text: "- : Kết thúc bằng" },
            { text: "! : Không chứa" },
          ],
        },
        {
          xtype: "textfield",
          flex: 3,
        },
      ],
    },
    {
      text: "Ngày sinh",
      dataIndex: "dateOfBirth",
      flex: 1,
      menuDisabled: true,
      layout: "hbox",
      sortable: false,
      align:"center",
      items: [
        {
          xtype: "button",
          text: "*",
          flex: 1,
          arrowAlign: "left",
          menu: [
            { text: "* : Chứa" },
            { text: "= : Bằng" },
            { text: "+ : Bắt đầu bằng" },
            { text: "- : Kết thúc bằng" },
            { text: "! : Không chứa" },
          ],
          listeners: {
            select: function () {
              Ext.Msg.alert("Success!");
            },
          },
        },
        {
          xtype: "datefield",
          flex: 3,
        },
      ],
    },
    {
      text: "Trạng thái làm việc",
      dataIndex: "statusWork",
      flex: 1,
      layout: "hbox",
      menuDisabled: true,
      sortable: false,
      items: [
        {
          xtype: "combo",
          label: "Choose one",
          valueField:'value',
          displayField:'display',
          store:[
            {value:"0",display:'Đang làm việc'},
            {value:"0",display:'Đang thử việc'},
            {value:"1",display:'Đã nghỉ việc'},
          ],
          width:"100%"
        },
      ],
    },
    {
      text: "Giới tính",
      dataIndex: "gender",
      flex: 1,
      menuDisabled: true,
      sortable: false,
      layout: "hbox",
      fullscreen:true,
      items: [
        {
          xtype: "combo",
          label: "Choose one",
          valueField:'value',
          displayField:'display',
          store:[
            {value:"0",display:'Nam'},
            {value:"1",display:'Nữ'}
          ],
          width:"80%"
        },
      ],
    },
  ],
  height: "100%",
  width: "100%",
  dockedItems: [
    {
      xtype: "pagingtoolbar", // same store GridPanel is using
      dock: "bottom",
      items: [
        {
          xtype: "combo",
          label: "Choose one",
          value:"1",
          valueField:'value',
          displayField:'display',
          store:[
            {value:"1",display:'1'},
            {value:"2",display:'2'},
            
            {value:"3",display:'3'},
          ],
          width:"50px"
        },
        {
          xtype: "tbfill",
        },
        {
          text: "Hiển thị 1-3 trên 3 kết quả",
        },
      ],
    },
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          xtype: "button",
          text: "Thêm",
          cls: "",
        },

        {
          xtype: "button",
          text: "Nhân bản",
        },
        {
          xtype: "button",
          text: "Xem",
        },
        {
          xtype: "button",
          text: "Sửa",
        },
        {
          xtype: "button",
          text: "Xóa",
        },
        {
          xtype: "button",
          text: "Nạp",
        },
        {
          xtype: "button",
          text: "Giúp",
        },
        {
          xtype: "tbfill",
        },
      ],
    },
  ],
});
