## Flutter中的表单组件

### Flutter中的表单组件类型

TextFormField：用于接收单行文本输入，例如用户名、密码等。它支持验证输入、自动校正和键盘类型设置。

TextField：类似于TextFormField，但不包含验证和自动校正功能。可用于简单的文本输入。

DropdownButtonFormField：用于显示下拉选择框，并允许用户从预定义选项中进行选择。

CheckboxListTile：用于显示复选框，用户可以选择或取消选择。

RadioListTile：用于显示单选按钮，用户从多个选项中选择一个。

Switch：用于显示开关按钮，用户可以切换开关状态。

Slider：用于显示滑块，用户可以通过滑动来选择数值。

DateTimePicker：可使用第三方库（如flutter_datetime_picker）实现日期时间选择器，用于选择日期和时间。

这些表单组件通常与Form和FormField一起使用。Form是一个容器，可将多个FormField组合在一起，并提供表单级别的验证和提交操作。FormField是一个抽象基类，用于包装表单字段并处理其状态和验证逻辑。

```dart
import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  int _age = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Form'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
                onChanged: (value) {
                  setState(() {
                    _name = value;
                  });
                },
              ),
              SizedBox(height: 16.0),
              TextFormField(
                decoration: InputDecoration(labelText: 'Age'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your age';
                  }
                  return null;
                },
                onChanged: (value) {
                  setState(() {
                    _age = int.parse(value);
                  });
                },
              ),
              SizedBox(height: 16.0),
              RaisedButton(
                onPressed: () {
                  if (_formKey.currentState.validate()) {
                    showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          title: Text('Form Data'),
                          content: Text('Name: $_name\nAge: $_age'),
                          actions: [
                            ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('OK'),
                            ),
                          ],
                        );
                      },
                    );
                  }
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: MyForm(),
  ));
}
```

如果是校验表单，使用下面的代码

```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Name',
  ),
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your name';
    }
    return null;
  },
  onChanged: (value) {
    // 更新相关状态或执行其他操作
  },
)
```