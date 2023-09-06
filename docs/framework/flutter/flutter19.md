## Flutter中的数据请求封装

在Flutter中，可以使用Dart的http包或第三方库（如Dio）来进行HTTP请求的封装和处理。

### 实现步骤

1、在pubspec.yaml文件中添加dio依赖：

```dart
dependencies:
  dio: ^4.0.0

```

2、创建一个名为api_service.dart的文件，并编写一个封装了HTTP请求的服务类

```dart
import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio;

  ApiService() : _dio = Dio();

  Future<dynamic> get(String url) async {
    try {
      final response = await _dio.get(url);
      return response.data;
    } catch (error) {
      // 处理错误
      print('Error: $error');
      throw error;
    }
  }

  Future<dynamic> post(String url, Map<String, dynamic> data) async {
    try {
      final response = await _dio.post(url, data: data);
      return response.data;
    } catch (error) {
      // 处理错误
      print('Error: $error');
      throw error;
    }
  }
}
```

上述示例创建了一个名为ApiService的服务类，它使用Dio库来执行GET和POST请求。get()方法发送GET请求，post()方法发送POST请求。

3、在需要进行HTTP请求的地方，实例化ApiService对象并调用相应的方法：

```dart
final apiService = ApiService();

void fetchData() async {
  try {
    final response = await apiService.get('https://api.example.com/data');
    // 处理响应数据
    print(response);
  } catch (error) {
    // 处理错误
    print(error);
  }
}
```

下面是一个更详细的例子

```dart
import 'package:flutter/material.dart';
import 'api_service.dart';

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  final ApiService apiService = ApiService();

  void fetchData() async {
    try {
      final response = await apiService.get('/data', queryParameters: {'param1': 'value1'});
      // 处理响应数据
      print(response);
    } catch (error) {
      // 处理错误
      print(error);
    }
  }

  void postData() async {
    try {
      final response = await apiService.post('/submit', data: {'name': 'John', 'age': 30});
      // 处理响应数据
      print(response);
    } catch (error) {
      // 处理错误
      print(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('API Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: fetchData,
              child: Text('Fetch Data'),
            ),
            ElevatedButton(
              onPressed: postData,
              child: Text('Post Data'),
            ),
          ],
        ),
      ),
    );
  }
}
```