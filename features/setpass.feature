@setpass
Feature: set password function test
    设置密码功能
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录

    Scenario Outline: 密码修改成功和原密码错误修改失败
        When 导航到更改密码页面
        Then 当前密码输入'<pass>',新密码输入'<newpass>',点击更改密码按钮，成功或失败'<status>',修改成功得到提示'<sucMsg>',修改失败得到提示'<errorMsg>'
        Examples:
        |pass|newpass|status|sucMsg|errorMsg|
        |abc4862556|abc4862556|success|密码已被修改。||
        |123|321|error||当前密码不正确。|
        |||null||旧密码或新密码不得为空|
    # @setpass1
    # Scenario: 密码为空更改失败
    #     When 导航到更改密码页面
    #     Then 当前密码输入'',新密码输入''
    #     Then 点击更改密码按钮，得到错误提示'旧密码或新密码不得为空'
    
    
    