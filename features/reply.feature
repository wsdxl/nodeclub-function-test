@reply
Feature: reply  function test
    回帖功能测试
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录
   
   Scenario Outline: 回帖异常场景
        When 导航到回帖页面
        Then 点击照片输入路径'<path>',输入内容'<content>',点击回帖按钮，成功或者失败'<status>',回帖成功，页面含有'<successMsg>'回帖失败，得到错误提示'<errorMsg>'
        Examples:
        |path|content|status|successMsg|errorMsg|
        |1.jpg|你是最棒的！|success|你是最棒的！||
        |null||error||回复内容不能为空!|

    
    