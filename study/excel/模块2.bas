Attribute VB_Name = "ģ��2"
Sub ��ϸ_Click()
If Not CheckIsExistsSheetName("Detail") Then
    MsgBox "��ϸ�����ڣ�����Detail��"
    Worksheets.Add After:=Sheets(Sheets.Count) '����µĹ��������ڴ������
    Sheets(Sheets.Count).Name = "Detail"
Else
    MsgBox "��ϸ���Ѵ��ڣ�ɾ�����������ɣ�"
    Application.DisplayAlerts = False
    Worksheets("Detail").Delete
    Application.DisplayAlerts = True
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Detail"
End If
allNo = 1
For i = 1 To Sheets.Count - 1 '�������й�����������ӵĹ�������
n = Sheets(i).Range("A65536").End(xlUp).Row
Set j = Sheets(i).Range("A1:A" & n).Find("���ͻ�����д�������ż��۸�")
If j Is Nothing Then
    'MsgBox "δ�ҵ���λ��"
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
            'MsgBox "û�п���"
            b = j.Row   '������Ĭ��Ϊj.Row
        End If
        If i = 1 Then
            Sheets(i).Rows(1).Copy
            Sheets(Sheets.Count).Range("A1").PasteSpecial Paste:=xlPasteValues
            Application.CutCopyMode = False 'ȡ��Ӧ�ó�����ģʽ
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
    Selection.NumberFormatLocal = "m""��""d""��"";@"
    MsgBox "��ϸ�������ɣ�"
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
