Imports System.Runtime.Serialization
Imports System.ServiceModel
Imports MISA.QLNH.Library
Imports MISA.QLNH.Library.Enumerate
<DataContract>
Public Class Employee
    Inherits BaseEntity
    ''' <summary>
    ''' Id khach hang
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property EmployeeId As Guid
    ''' <summary>
    ''' Ma khach hang
    ''' </summary>
    ''' <returns></returns>
    <Required>
    <DataMember>
    Public Property EmployeeCode As String
    ''' <summary>
    ''' Ten day du
    ''' </summary>
    ''' <returns></returns>
    <Required>
    <DataMember>
    Public Property FullName As String
    ''' <summary>
    ''' Gioi tinh
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Gender As Integer
    ''' <summary>
    ''' Ngay thang nam sinh
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property DateOfBirth As Date?
    ''' <summary>
    ''' Dia chi
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Address As String
    ''' <summary>
    ''' Email
    ''' </summary>
    ''' <returns></returns>
    <Required>
    <DataMember>
    Public Property Email As String
    ''' <summary>
    ''' So dien thoai nha rieng
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property PhoneHomeNumber As String
    ''' <summary>
    ''' SO dien thoai di dong
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property PhoneNumber As String
    ''' <summary>
    ''' So CMND/The can cuoc
    ''' </summary>
    ''' <returns></returns>
    <Required>
    <DataMember>
    Public Property IdentityNumber As String
    ''' <summary>
    ''' 
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property IdentityDate As Date?
    ''' <summary>
    ''' Ngay cap CMND/Can cuoc
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property IdentityPlace As String
    ''' <summary>
    ''' Noi cap CMND/Can cuoc
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property JoinDate As Date?
    ''' <summary>
    ''' Luong
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Salary As Decimal?
    ''' <summary>
    ''' Tinh trang cong viec
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property WorkStatus As Integer?
    ''' <summary>
    ''' Quoc gia 
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Nationality As String
    ''' <summary>
    ''' Tinh/Thanh Pho
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property City As String
    ''' <summary>
    ''' Quan/Huyen
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property District As String
    ''' <summary>
    ''' Xa/Phuong
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Ward As String
End Class
