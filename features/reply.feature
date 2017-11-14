@reply
Feature: reply  function test
    回帖功能测试
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录

    @reply1    
    # Scenario: 未输入信息，直接点击回复
    #     When 导航到回帖页面
    #     Then 直接点击回帖按钮，得到提示信息'回复内容不能为空!'

    # Scenario: 添加照片和内容，回帖成功
    #     When 导航到回帖页面
    #     Then 点击照片输入路径'E://01.png' ，输入内容'你是最棒的！'
    #     Then 回帖成功，跳转的页面含有'1 回复'
   
   Scenario Outline: 回帖异常场景
        When 导航到回帖页面
        Then 点击照片输入路径'<path>',输入内容'<content>',点击回帖按钮，成功或者失败'<status>',回帖成功，页面含有'<successMsg>'回帖失败，得到错误提示'<errorMsg>'
        Examples:
        |path|content|status|successMsg|errorMsg|
        |E://01.png|你是最棒的！|success|你是最棒的！||
        |null||error||回复内容不能为空!|

    
    