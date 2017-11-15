@topic
Feature: posted  function test
    发帖功能测试
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录

    Scenario: 验证是否正确跳转到发帖页面
        When 点击发布话题，跳转到发帖页面，左上角有'发布话题'标签
    @topic1
    Scenario Outline: 选择不同板块，发帖成功 
        When 导航到发帖页面
        Then  板块选择'<plate>',标题输入'<title>',点击照片输入路径'<imageFileName>' ，输入内容'<content>'
        Then 点击提交按钮,成功或者失败'<status>'.成功跳转到首页，得到新的标题，失败得到错误提示'<message>'
        Examples:
        |plate|title|imageFileName|content|status|message|
        |分享|今日是周末，大家学习了吗|1.jpg|明天要上班啦，你准备好了吗？|success||
        |问答|大家好，今天你学习了吗|1.jpg|大家好，今天你学习了吗？|success||
        |招聘|招聘美女一枚，做饭洗衣服|1.jpg|招聘美女一枚，要求全能型人才|success||
        ||招聘美女一枚，做饭洗衣服|1.jpg|招聘美女一枚，要求全能型人才|tabError|必须选择一个版块！|
        |分享|你好|1.jpg|11111111|contentError|标题字数太多或太少。|
        |分享||1.jpg|22222222|contentError|标题不能是空的。|
        |招聘|招聘美女一枚，做饭洗衣服|null||contentError|内容不可为空|
    
    
    
    