Attribute VB_Name = "模块2"
Sub 明细_Click()
If Not CheckIsExistsSheetName("Detail") Then
    MsgBox "明细表不存在，生成Detail表！"
    Worksheets.Add After:=Sheets(Sheets.Count) '添加新的工作表，用于存放数据
    Sheets(Sheets.Count).Name = "Detail"
Else
    MsgBox "明细表已存在，删除再重新生成！"
    Application.DisplayAlerts = False
    Worksheets("Detail").Delete
    Application.DisplayAlerts = True
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Detail"
End If
allNo = 1
For i = 1 To Sheets.Count - 1 '遍历所有工作表，除新添加的工作表外
n = Sheets(i).Range("A65536").End(xlUp).Row
Set j = Sheets(i).Range("A1:A" & n).Find("在送货单上写明订单号及价格")
If j Is Nothing Then
    'MsgBox "未找到定位行"
Else
    'MsgBox j.Row
    b = 0
    For m = 10 To j.Row - 1
        Set f = Sheets(i).Range("A" & m)
        If f = "" Then
            b = f.Row
            Exit For
        End If
    Next m
        If b = 0 Then
            'MsgBox "没有空行"
            b = j.Row   '空行数默认为j.Row
        End If
        If i = 1 Then
            Sheets(i).Rows(1).Copy
            Sheets(Sheets.Count).Range("A1").PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False '取消应用程序复制模式
            Sheets(i).Rows(2).Copy
            Sheets(Sheets.Count).Range("A2").PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False
            Sheets(i).Range("A10:E" & b - 1).Copy
            Sheets(Sheets.Count).Range("D2").PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False
        Else
            Sheets(i).Rows(2).Copy
            Sheets(Sheets.Count).Range("A" & allNo + 1).PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False
            Sheets(i).Range("A10:E" & b - 1).Copy
            Sheets(Sheets.Count).Range("D" & allNo + 1).PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False
        End If
        allNo = allNo + b - 10
End If
Next i
    Range("B:B,C:C").Select
    Range("C1").Activate
    Selection.NumberFormatLocal = "yyyy/m/d"
    Columns("N:N").Select
    Selection.NumberFormatLocal = "m""月""d""日"";@"
    MsgBox "明细表已生成！"
End Sub


Function CheckIsExistsSheetName(ByVal SheetName) As Boolean
    CheckIsExistsSheetName = False
    Dim sheet As Worksheet
    For Each sheet In ThisWorkbook.Sheets
        If sheet.Name = SheetName Then
            CheckIsExistsSheetName = True
            Exit Function
        End If
    Next
End Function
