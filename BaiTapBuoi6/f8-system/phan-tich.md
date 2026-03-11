Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?
-Inline style
Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?
-#main
-Vì : #main  >  .title  >  h1
Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?
-Các phần tử sẽ có color màu pink
Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?
-Vì theme.css được load sau base.css, nên CSS trong theme.css có thể ghi đè (override) style trước đó.
Điều kiện để override là theme.css phải đặt sau base.css
Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.
Hai phần tử cùng dùng class .title nhưng hiển thị màu khác nhau vì một phần tử bị selector khác trong theme.css override.
Selector đó có độ ưu tiên cao hơn hoặc được khai báo sau nên ghi đè style của .title.
Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.
-Phần tử có css phức tạp nhất : 
+ <h1 class="title" id="special" style="color: aqua"> DASHBOARD</h1>
+ <h2 class="title" id="special" style="color: burlywood">Danh sach don hang</h2>
-các selector tác động lên nó : tag, class,id, tag+class , tag+class+id,inline style
-Inline style thắng cuối cùng  


