
/**
 * Created by Lin.Zhi on 2014-10-23.
 */

//Print console.log with Date-Time Stamp
printLog = function(logText){
    var moment = require('moment');
    console.log('[' + moment().format('YYYY-MM-DDTHH:mm:ss.SSS[GMT]ZZ') + '] ' + logText);
};

logins2k = function(){
    var username = browser.params.login.usermail;
    var password = browser.params.login.password;
    browser.get('http://store.s2k.net/admin/#/login');//

    element(by.model('selected')).clear().sendKeys('search is visible');

    //element(by.model('user.email')).sendKeys('tsotest@s2k.net'); //直接输入用户名
    element(by.model('user.email')).sendKeys(username); //使用conf_test.js中的params.login.usermail
    element(by.model('user.email')).getAttribute('value').then(printLog);

    //element(by.model('user.password')).sendKeys('1234'); //直接输入用户名
    element(by.model('user.password')).sendKeys(password); //使用conf_test.js中的参数params.login.password
    element(by.model('user.password')).getAttribute('value').then(printLog);


    var btnLogin = element(by.buttonText('LOGIN'));
    btnLogin.click();//login
    element(by.model('selected')).clear();
};

showfooter = function() {
    /*
     var tmp;
     element.all(by.tagName('footer')).each(function(ele){
     tmp=ele.getText();
     });
     */

    //element(by.model('selected')).getAttribute('value').then(console.log);
    //element(by.model('selected')).getAttribute('class').then(console.log);

    //expect(element(by.model('selected')).isDisplayed()).toBeTruthy();
    element(by.model('selected')).isDisplayed().then(function(isVisible){
        if (isVisible !== true) {
            element(by.model('breadcrumbs.listingSearch')).isDisplayed().then(function(isVisible){
                if (isVisible !== true) {
                    printLog('*** *** *** Search Box ISNOT Visible ! *** *** ***');
                }
            });
        }
    });
    //    element(by.model('selected')).clear().sendKeys(tmp);
    //});
};

click_products_catalog = function(dropdown, menuindex, listindex){

    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //products catalog固定值0
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located ' + list + ' SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    //added on 2014-11-11 click "new" button
    var clickButton=element(by.css('[ng-click="new()"]')); //Get New Button
    clickButton.getText().then(function(text){
        console.log('\nClick Button Name [ ' + text + ' ]');
    });
    expect(clickButton.getText()).toEqual('New');
    clickButton.click().then(showfooter);

    var newInput;
    dropdown.getText().then(function(text){
        if (text == 'Marketing' && menuindex == 1) { //Marketing -> Advertizement Items
            newInput = element.all(by.css('.col-md-4 input'));
        } else if(text == 'Products' && menuindex == 7) { //Products -> Tax Rates
            newInput = element.all(by.css('.col-md-2 input'));
        } else {
            newInput = element.all(by.css('.col-md-6 input'));
        }
        newInput.count().then(function(icount){
            console.log('Located ' +icount + ' Input Box(s)');
        });
        newInput.each(function (ele) {
            //ele.clear().sendKeys('Valided by protractor.');
            ele.sendKeys(' (Valided by protractor)');
        });
    });
    clickButton=element(by.css('[ng-click="backToList()"]'));
    clickButton.getText().then(function(text){
        console.log('Go Back To [ ' + text + ' ] Page\n');
    });
    expect(clickButton.getText()).toEqual('Listing');
    clickButton.click().then(showfooter);

    subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    var list=element.all(by.repeater('item in items')); //Get List
    list.count().then(function(icount){
        if (icount > 0) {
            console.log('Click List Record No. ' + ((listindex % icount)+1) + '/' + icount);
            list.get(listindex % icount).click().then(showfooter);

            var subTitle2 = element.all(by.css('[ng-show="subTitle"]'));
            subTitle2.count().then(function(list){
                if (list>0) {
                    console.log('Located SubTitle Name [ Editing ]');
                }
                else {
                    console.log('*** *** *** CANNOT Located SubTitle Name [ Editing ] !');
                }
            });
            //subTitle.count().then(console.log);
            //subTitle2.each(function (ele) {
            //    subTitle2.count().then(console.log);
            //    ele.getText().then(console.log);
                //expect(ele.getText()).toEqual('Listing');

                //ele.getAttribute('class').then(console.log);
            //});
            expect(subTitle2.first().getText()).toEqual('Editing');

            var input = element.all(by.css('.col-md-6 input'));
            input.count().then(function(icount){
                console.log('Located ' +icount + ' Input Box(s)');
            });
            input.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });
        }
        else {
            console.log('*** *** *** No Record(s) *** *** *** Found in the [ Listing ], Ignore [ Editing ] Checking.');
        }
    });
    //list.each(function(ele){
        //ele.getText().then(console.log);
    //});
};

click_advanced_search = function(dropdown, menuindex, listindex){

    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //products catalog固定值0
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located ' + list + ' SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    //added on 2014-11-12 click "Advanced Search" button for "Products Catalog"
    dropdown.getText().then(function(text){
        console.log(text + ' ' + menuindex + ' ready to advanced search');
        if (text == "Products" && menuindex == 0) {
            var advSearch = element.all(by.css('[ng-click="modalSearch()"]')).first();
            advSearch.click();

            var mSelect = element(by.model('item.categoryid'));
            mSelect.element(by.css('input')).sendKeys('test to input filter').clear();

            element.all(by.css('.input-group-btn button')).first().click();

            var dList = element.all(by.css('[class="input-group-btn open"]')).all(by.css('li'));

            dList.count().then(function(icount){
                dList.get(listindex % icount).click();
            });

            element(by.css('[ng-click="ok()"]')).click().then(showfooter);

            //expect(element.all(by.repeater('item in items')).count()).toBeGreaterThan(0);
            expect(element.all(by.repeater('item in items')).count()).not.toBe(0);

            element(by.css('[ng-click="modalSearchReset()"]')).click();
        }
    });
};

click_pricebook = function(dropdown, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(1); //pricebook固定值
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:1');
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    var list=element.all(by.repeater('item in items')); //Get List
    list.count().then(function(icount){
        if (icount > 0) {
            console.log('Click List Record No. ' + ((listindex % icount)+1) + '/' + icount);
            list.get(listindex % icount).click().then(showfooter); //点击单项

            /*
            var modaldialog = element.all(by.model('form'));
            modaldialog.each(function(ele) {
                console.log('form count: ');
                modaldialog.count().then(console.log);
                ele.getText().then(console.log);
                ele.getAttribute('class').then(console.log);
            });
            */

            //expect(modaldialog.first().getText()).toEqual('Editing');

            var input = element.all(by.css('.col-md-4 input'));
            input.count().then(console.log);
            input.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });

            element(by.css('[ng-click="cancel()"]')).click(); //cancel click
        }
        else{
            console.log('*** *** *** No Record(s) *** *** *** Found in the [ Listing ], Ignore [ Editing ] Checking.');
        }
    });

    subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    //added on 2014-11-11 click "new" button
    var clickButton=element(by.css('[ng-click="new()"]')); //Get New Button
    clickButton.getText().then(function(text){
        console.log('\nClick Button Name [ ' + text + ' ]');
    });
    expect(clickButton.getText()).toEqual('New');
    clickButton.click().then(showfooter);

    var newInput = element.all(by.css('.col-md-6 input'));
    newInput.count().then(function(icount){
        console.log('Located ' +icount + ' Input Box(s)');
    });
    newInput.each(function (ele) {
        //ele.clear().sendKeys('Valided by protractor.');
        ele.sendKeys(' (Valided by protractor)');
    });
};

//Modified On 2014-11-17 by LinZhi
click_pricebook_modify = function(dropdown, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(1); //pricebook固定值
    menu.getText().then(function(menutext){
        printLog('Click Dropdown Menu [ '+ menutext +' ] Index:1');
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            printLog('Located SubTitle Name [ Listing ]');
        }
        else {
            printLog('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

/*  filter功能是有效的，但引用的时候，会重复执行filter过程。所以暂时不用这个方法
    var ifilter = element.all(by.repeater('item in items')).filter(function(ele){
        return ele.all(by.css('.col-md-1')).get(0).getText().then(function(value){
            var getretail = value;
            console.log('Get Retail 1 :' + getretail);
            return ele.all(by.css('.col-md-1')).get(1).getText().then(function(srp){
                console.log('Get SRP :' + srp);
                console.log('Get Retail 2 :' + getretail + '\n');
                return srp === getretail;
            });
        });
    });
*/
    var list=element.all(by.repeater('item in items')); //Get List
    var found = false, check = 0, ireturn = -1;
    list.count().then(function(icount) {
        //这个for循环是一个比较“诡异”的闭包函数运算
        //同步“并发”遍历所有列表中的子元素
        //如果找到Retail==SRP则返回index的位置(ilcount);
        //如果找不到，则返回：-1(初始值);
        //check <= listindex是查找第几个子元素:
        //listindex = 0：查找第0个；listindex = 1：查找第1个；以此类推。

        printLog('Searching for Retail == SRP from list count: ' + icount);
        for (var i = 0; i < icount; i++) {
            (function (ilcount) {
                var iPrice = list.get(ilcount).all(by.css('.col-md-1'));
                iPrice.count().then(function (ipcount) {
                    iPrice.get(0).getText().then(function (iretail) {
                        iPrice.get(1).getText().then(function (isrp) {
                            if (iretail == isrp && check <= listindex) {
                                found = true;
                                check++;
                                ireturn = ilcount;
                                //printLog('Test : ' + ilcount + ' Price Fields: ' + ipcount + ' Retail : ' + iretail + ' SRP : ' + isrp);
                            }
                        });
                    });
                });
            })(i);
        }
    }).then(function(){
        printLog((found ? 'Found' : 'Can Not Find') + ' Retail == SRP in the Records No.: ' + check + ' List-Index :' + ireturn);
        return ireturn;
    }).then(function(iselect) {
        if (iselect >= 0) {
            var sname, sbarcode, iretail, isrp;
            //var iselect = 6 + listindex;
            list.get(iselect).all(by.css('.col-md-2')).get(0).getText().then(function (text) { //get Name
                sname = text;
            }).then(function () {
                list.get(iselect).all(by.css('.col-md-2')).get(1).getText().then(function (text) { //get Barcode
                    sbarcode = text;
                });
            }).then(function () {
                list.get(iselect).all(by.css('.col-md-1')).get(0).getText().then(function (text) { //get Retail
                    iretail = text.replace('$', '');
                });
            }).then(function () {
                list.get(iselect).all(by.css('.col-md-1')).get(1).getText().then(function (text) { //get SRP
                    isrp = text.replace('$', '');
                });
            }).then(function () {
                printLog('Name: ' + sname + ' Barcode: ' + sbarcode + ' Retail: ' + iretail + ' SRP: ' + isrp);
            }).then(function () {
                list.get(iselect).click();
            }).then(function () {
                var input = element(by.model('item.retail'));
                input.getAttribute('value').then(function (text) { //check Retail
                    printLog('Line Retail Price: ' + text);
                    expect(Number(text)).toBe(Number(iretail));
                }).then(function () {
                    printLog('Add Price: 0.01');
                    input.clear().sendKeys(String(Number(iretail) + 0.01));
                });
            }).then(function () {
                element(by.css('[ng-click="ok()"]')).click().then(showfooter); //Submit Retail change
            }).then(function () {
                list.get(iselect).click().then(showfooter);
            }).then(function () {
                var input = element(by.model('item.retail'));
                input.getAttribute('value').then(function (newretail) {
                    printLog('New Retail Price: ' + newretail);
                    expect(Number(newretail)).toBe(Number(iretail) + 0.01); //Verify Retail Change
                });
            }).then(function () {
                element(by.css('[ng-click="cancel()"]')).click().then(showfooter); //Go back to list
            }).then(function () {
                browser.actions().keyDown(protractor.Key.CONTROL).click(list.get(iselect)).keyUp(protractor.Key.CONTROL).perform(); //CTRL+Click
            }).then(function () {
                element(by.css('[ng-click="suggested()"]')).click().then(showfooter);
            }).then(function () {
                printLog('Choose Change Type: (+)Add and Update');
                element.all(by.model('item.updateType')).filter(function (ele) {
                    return ele.getAttribute('value').then(function (value) { //RETURN the whole get value function
                        return value === "1"; //RETURN true OR false
                    });
                }).click().then(showfooter);
            }).then(function () {
                element(by.css('[ng-click="ok()"]')).click().then(function () { //Retail Reset to SRP
                    browser.sleep(1000); //wait for alert to show
                    browser.switchTo().alert().accept();
                }).then(showfooter);
            }).then(function () {
                list.get(iselect).all(by.css('.col-md-1')).get(0).getText().then(function (text) { //Verify Retail & SRP
                    printLog('Retail Reset to SRP: ' + text);
                    expect(Number(text.replace('$', ''))).toBe(Number(isrp));
                });
            });
        }
    });
};

click_fuel_grade = function(dropdown, menuindex, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //products catalog固定值0
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    //subTitle1.each(function(ele){
        //subTitle.count().then(console.log);
        //ele.getText().then(console.log);
        //expect(ele.getText()).toEqual('Listing');

        //ele.getAttribute('class').then(console.log);
    //});
    expect(subTitle1.first().getText()).toEqual('Listing');

    //added on 2014-11-11 click "new" button
    var clickButton=element(by.css('[ng-click="new()"]')); //Get New Button
    clickButton.getText().then(function(text){
        console.log('\nClick Button Name [ ' + text + ' ]');
    });
    expect(clickButton.getText()).toEqual('New');
    clickButton.click().then(showfooter);

    var newInput;
    switch(menuindex) {
        //fuel grades
        case 1:case 2:case 3:
            newInput = element.all(by.css('.col-md-8 input'));
            newInput.count().then(function(icount){
                console.log('Located ' +icount + ' Input Box(s)');
            });
            newInput.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });

            clickButton=element(by.css('[ng-click="backToList()"]'));
            clickButton.getText().then(function(text){
                console.log('Go Back To [ ' + text + ' ] Page\n');
            });
            expect(clickButton.getText()).toEqual('Listing');
            clickButton.click().then(showfooter);
            break;
        //fuel tanks
        case 4:
            newInput = element.all(by.css('.col-md-4 select'));
            newInput.count().then(function(icount){
                console.log('*** ***\nLocated ' +icount + ' Select List(s)\n*** ***');
            });
            newInput.each(function (ele) {
                //ele.getAttribute('name').then(console.log);
                ele.all(by.tagName('option')).last().click();
            });

            clickButton=element(by.css('[ng-click="backToList()"]'));
            clickButton.getText().then(function(text){
                console.log('Go Back To [ ' + text + ' ] Page\n');
            });
            expect(clickButton.getText()).toEqual('Listing');
            clickButton.click().then(showfooter);
            break;
        //fuel blends
        case 5:
            newInput = element.all(by.css('.col-md-4 input'));
            newInput.count().then(function(icount){
                console.log('Located ' +icount + ' Input Box(s)');
            });
            newInput.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });

            clickButton=element(by.css('[ng-click="backToList()"]'));
            clickButton.getText().then(function(text){
                console.log('Go Back To [ ' + text + ' ] Page\n');
            });
            expect(clickButton.getText()).toEqual('Listing');
            clickButton.click().then(showfooter);
            break;
        default:
            break;
    }

    subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    var list=element.all(by.repeater('item in items')); //Get List
    list.count().then(function(icount){
        if (icount > 0) {
            console.log('Click List Record No. ' + ((listindex % icount) + 1) + '/' + icount);
            list.get(listindex % icount).click().then(showfooter);

            var subTitle2 = element.all(by.css('[ng-show="subTitle"]'));
            subTitle2.count().then(function(list){
                if (list>0) {
                    console.log('Located SubTitle Name [ Editing ]');
                }
                else {
                    console.log('*** *** *** CANNOT Located SubTitle Name [ Editing ] !');
                }
            });
            //subTitle.count().then(console.log);
            //subTitle2.each(function (ele) {
            //    subTitle2.count().then(console.log);
            //    ele.getText().then(console.log);
            //expect(ele.getText()).toEqual('Listing');

            //ele.getAttribute('class').then(console.log);
            //});
            expect(subTitle2.first().getText()).toEqual('Editing');

            var input = element.all(by.css('.col-md-8 input'));
            input.count().then(function(icount){
                console.log('Located ' +icount + ' Input Box(s)');
            });
            input.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });
        }
        else{
            console.log('*** *** *** No Record(s) *** *** *** Found in the [ Listing ], Ignore [ Editing ] Checking.');
        }
    });
};

click_store = function(dropdown, menuindex, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //products catalog固定值0
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    //subTitle1.each(function(ele){
        //subTitle.count().then(console.log);
        //ele.getText().then(console.log);
        //expect(ele.getText()).toEqual('Listing');

        //ele.getAttribute('class').then(console.log);
    //});
    expect(subTitle1.first().getText()).toEqual('Listing');

    //added on 2014-11-11 click "new" button

    //menuindex 6: Shipping Methods
    //menuindex 13: Site Navigations
    if (menuindex != 6 && menuindex != 13) {
        var newButton=element(by.css('[ng-click="new()"]')); //Get New Button
        newButton.getText().then(function(text){
            console.log('\nClick Button Name [ ' + text + ' ]');
        });
        expect(newButton.getText()).toEqual('New');
        newButton.click().then(showfooter);
        var newInput;
        //menuindex 12: Site Pages
        if (menuindex == 12) {
            newInput = element.all(by.css('.col-md-8 input'));
        } else {
            newInput = element.all(by.css('.col-md-4 input'));
        }

        newInput.each(function (ele) {
            //ele.clear().sendKeys('Valided by protractor.');
            ele.sendKeys(' (Valided by protractor)');
        });
        newInput.count().then(function (icount) {
            console.log('Located ' + icount + ' Input Box(s)');
            if (icount > 0) {
                newInput.first().sendKeys(' ');
            }
        });
        //browser.actions().keyDown(protractor.Key.CONTROL).click(list.get(listindex % icount)).keyUp(protractor.Key.CONTROL).perform();
        //browser.actions().keyDown(protractor.Key.HOME).keyUp(protractor.Key.HOME).perform();
        var listButton = element(by.css('[ng-click="backToList()"]'));
        listButton.getText().then(function (text) {
            console.log('Go Back To [ ' + text + ' ] Page\n');
        });
        expect(listButton.getText()).toEqual('Listing');
        listButton.click().then(showfooter);

        subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
        subTitle1.count().then(function(list){
            if (list>0) {
                console.log('Located SubTitle Name [ Listing ]');
            }
            else {
                console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
            }
        });
        expect(subTitle1.first().getText()).toEqual('Listing');
    }

    subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Listing ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Listing ] !');
        }
    });
    expect(subTitle1.first().getText()).toEqual('Listing');

    var list=element.all(by.repeater('item in items')); //Get List
    list.count().then(function(icount){
        if (icount > 0) {
            console.log('Click List Record No. ' + ((listindex % icount) + 1) + '/' + icount);
            list.get(listindex % icount).click().then(showfooter);

            var subTitle2 = element.all(by.css('[ng-show="subTitle"]'));
            subTitle2.count().then(function(list){
                if (list>0) {
                    console.log('Located SubTitle Name [ Editing ]');
                }
                else {
                    console.log('*** *** *** CANNOT Located SubTitle Name [ Editing ] !');
                }
            });
            expect(subTitle2.first().getText()).toEqual('Editing');

            var input = element.all(by.css('.col-md-4 input'));
            input.count().then(function(icount){
                console.log('Located ' +icount + ' Input Box(s)');
            });
            input.each(function (ele) {
                //ele.clear().sendKeys('Valided by protractor.');
                ele.sendKeys(' (Valided by protractor)');
            });
        }
        else{
            console.log('*** *** *** No Record(s) *** *** *** Found in the [ Listing ], Ignore [ Editing ] Checking.');
        }
    });
};

click_logs = function(dropdown, menuindex, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //pricebook固定值
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ History ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ History ] !');
        }
    });
    //subTitle1.each(function(ele){
        //subTitle.count().then(console.log);
        //ele.getText().then(console.log);
        //expect(ele.getText()).toEqual('Listing');

        //ele.getAttribute('class').then(console.log);
    //});
    expect(subTitle1.first().getText()).toEqual('History');

    var list=element.all(by.repeater('item in items')); //Get List
    list.count().then(function(icount){
        if (icount > 0) {
            console.log('Click History Record No. ' + ((listindex % icount) + 1) + '/' + icount);
            list.get(listindex % icount).click().then(showfooter); //点击单项

            var modaldialog = element.all(by.model('form'));
            modaldialog.each(function (ele) {
                //console.log('form count: ');
                var subcount=modaldialog.count();//.then(console.log);
                var subtext=ele.getText();//.then(console.log);
                var subAtt=ele.getAttribute('class');//.then(console.log);
            });
            expect(element(by.css('.modal-header h3')).getText()).toEqual('Job Steps');

            element(by.css('[ng-click="cancel()"]')).click(); //cancel click
        }
        else{
            console.log('*** *** *** No Record(s) *** *** *** Found in the [ History ], Ignore [ Job Steps ] Checking.');
        }
    });
};

click_report = function(dropdown, menuindex, listindex){
    //console.log('\n********** Click List No. '+ (listindex+1) +' **********\n');
    var menu=dropdown.all(by.css('[ng-click="go(link.link)"]')).get(menuindex); //products catalog固定值0
    menu.getText().then(function(menutext){
        console.log('\nClick Dropdown Menu [ '+ menutext +' ] Index:' + menuindex);
    });
    menu.click().then(showfooter);
    //element(by.css('[placeholder="Search"]')).sendKeys('Search Box Visible');

    var subTitle1 = element.all(by.css('[ng-show="subTitle"]'));
    subTitle1.count().then(function(list){
        if (list>0) {
            console.log('Located SubTitle Name [ Dashboard ]');
        }
        else {
            console.log('*** *** *** CANNOT Located SubTitle Name [ Dashboard ] !');
        }
    });
    //subTitle1.each(function(ele){
        //subTitle.count().then(console.log);
        //ele.getText().then(console.log);
        //expect(ele.getText()).toEqual('Listing');

        //ele.getAttribute('class').then(console.log);
    //});
    expect(subTitle1.first().getText()).toEqual('Dashboard');

    var list=element.all(by.tagName('svg')); //Get List
    //list.count().then(console.log);
    list.count().then(function(icount){
        console.log('Click List Record No. ' + ((listindex % icount)+1) + '/' + icount);
        list.get(listindex % icount).click().then(showfooter);
    });
    //list.each(function(ele){
        //ele.getAttribute('id').then(console.log);
    //    var tmp=ele.getAttribute('width');//.then(console.log);
    //});
    //list.get(0).getAttribute('id').then(console.log);
    //list.get(listindex % 2).click().then(showfooter);
    //console.log('Click Monthly Performance');
    //element(by.css('[placeholder="Search"]')).sendKeys('Search Box Visible');
};

//******************************************************************************************
//******************************************************************************************
//测试开始
//******************************************************************************************
//******************************************************************************************
describe("s2k login page", function() {
    it("login to system", logins2k);

    if (false) {
        describe('"Products" advanced search', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(0); //Get "Products"
                dropdown.click().then(showfooter);
            });
            var i;
            var testcount = browser.params.test.count;
            for (i = 0; i < testcount; i++) {
                (function (testindex) {
                    it('Products Catalog', function () {
                        click_advanced_search(dropdown, 0, testindex); //0=Products Catalog
                    });
                })(i);
            }
        });
    }

    if (false) {
        describe('"Products" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(0); //Get "Products"
                dropdown.click().then(showfooter);
            });
            var i;
            var testcount = browser.params.test.count;

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Products Catalog', function () {
                        click_products_catalog(dropdown, 0, testindex); //0=Products Catalog
                    });
                })(i);
            }

            //for (i = 0; i < 0 ; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Pricebook', function () {
                        //click_products_catalog(dropdown, testindex); //0=products catalog; 1=Pricebook
                        click_pricebook(dropdown, testindex); //0=products catalog; 1=pricebooks
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Department', function () {
                        click_products_catalog(dropdown, 2, testindex); //2=Department
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Fuel Grade', function () {
                        click_fuel_grade(dropdown, 3, testindex); //4=Fuel Grade
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Fuel Tank', function () {
                        click_fuel_grade(dropdown, 4, testindex); //4=Fuel Tank
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Fuel Blend', function () {
                        click_fuel_grade(dropdown, 5, testindex); //5=Fuel Blend
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Tax Zone', function () {
                        click_products_catalog(dropdown, 6, testindex); //6=Tax Zone
                    });
                })(i);
            }

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Tax Rate', function () {
                        click_products_catalog(dropdown, 7, testindex); //7=Tax Rate
                    });
                })(i);
            }
        });
    }
    if (false) {
        describe('"Marketing" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(1); //Get "Marketing"
                dropdown.click().then(showfooter);
            });
            var i;
            var testcount = browser.params.test.count;

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Promotion', function () {
                        click_products_catalog(dropdown, 0, testindex); //0=Products Catalog
                    });
                })(i);
            }

            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Advertizement Items', function () {
                        click_products_catalog(dropdown, 1, testindex); //1=Advertizement Items
                    });
                })(i);
            }

            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Advertizement Publish', function () {
                        click_products_catalog(dropdown, 2, testindex); //2=Advertizement Publish
                    });
                })(i);
            }
        });
    }
    if (false) {
        describe('"Entities" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(2); //Get "Entities"
                dropdown.click().then(showfooter);
            });
            var i;
            var testcount = browser.params.test.count;

            //for (i = 0; i < 0; i++) {
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Store', function () {
                        click_store(dropdown, 0, testindex); //0=Store
                    });
                })(i);
            }

            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Customer', function () {
                        click_fuel_grade(dropdown, 1, testindex); //1=Customer
                    });
                })(i);
            }

            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Vendor', function () {
                        click_fuel_grade(dropdown, 2, testindex); //2=Vendor
                    });
                })(i);
            }

            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Tax Authority', function () {
                        click_fuel_grade(dropdown, 3, testindex); //3=Tax Authority
                    });
                })(i);
            }
        });
    }
    if (false) {
        describe('"Logs" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(3); //Get "Logs"
                dropdown.click().then(showfooter);
            });
            var i, j;
            var testcount = browser.params.test.count;

            for (j = 0; j < 10; j++) {
                for (i = 0; i < testcount; i++) {
                    //for (i = 0; i < testcount; i++) {
                    //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                    (function (menuindex, testindex) {
                        it('[ Logs ] Dropdown List No. ' + (j + 1), function () {
                            click_logs(dropdown, menuindex, testindex); //0=Promotion Acceptance Workflow
                        });
                    })(j, i);
                }
            }
        });
    }
    if (false) {
        describe('"Settings" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(4); //Get "Settings"
                dropdown.click().then(showfooter);
            });
            var i, j;
            var testcount = browser.params.test.count;
            var listname = '';
            //for (j = 0; j < 14; j++) {
            for (j = 0; j < 2; j++) {
                switch (j) {
                    case 0:
                        listname = 'Accounts';
                        break;
                    case 1:
                        listname = 'Users';
                        break;
                    case 2:
                        listname = 'User Roles';
                        break;
                    case 3:
                        listname = 'loyalty Programs';
                        break;
                    case 4:
                        listname = 'Payment method';
                        break;
                    case 5:
                        listname = 'Credit Card Gateways';
                        break;
                    case 6:
                        listname = 'Shipping Methods';
                        break;
                    case 7:
                        listname = 'Fuel Tank Types';
                        break;
                    case 8:
                        listname = 'POS Cashiers';
                        break;
                    case 9:
                        listname = 'POS Terminals';
                        break;
                    case 10:
                        listname = 'Countries';
                        break;
                    case 11:
                        listname = 'States';
                        break;
                    case 12:
                        listname = 'Site Pages';
                        break;
                    case 13:
                        listname = 'Site Navigations';
                        break;
                    default:
                        listname = '';
                        break;
                }
                //for (i = 0; i < 0; i++) {
                for (i = 0; i < testcount; i++) {
                    //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                    (function (menuindex, testindex) {
                        it(listname, function () {
                            click_store(dropdown, menuindex, testindex); //0=Accounts
                        });
                    })(j, i);
                }
            }
        });
    }
    if (false) {
        describe('"Reports" menu navigation', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(5); //Get "Reports"
                dropdown.click().then(showfooter);
            });
            var i, j;
            var testcount = browser.params.test.count;
            var listname = '';
            for (j = 0; j < 2; j++) {
                //for (j=0;j<10;j++) {
                /* modified on 2014-11-10 */
                switch (j) {
                    case 0:
                        listname = 'Store Sales By Department';
                        break;
                    case 1:
                        listname = 'Gallon Sold By Fuel Grade';
                        break;
                    default:
                        listname = '';
                        break;
                }
                /* 10-reports
                 switch (j) {
                 case 0:
                 listname = 'Store Sales By Department';
                 break;
                 case 1:
                 listname = 'Store Sales By Marketing Area';
                 break;
                 case 2:
                 listname = 'Store Sales By CStore Brand';
                 break;
                 case 3:
                 listname = 'Store Sales By Overall Brand';
                 break;
                 case 4:
                 listname = 'Store Sales By Current Cot';
                 break;
                 case 5:
                 listname = 'Gallon Sold By Fuel Grade';
                 break;
                 case 6:
                 listname = 'Gallon Sold By Marketing Area';
                 break;
                 case 7:
                 listname = 'Gallon Sold By CStore Brand';
                 break;
                 case 8:
                 listname = 'Gallon Sold By Overall Brand';
                 break;
                 case 9:
                 listname = 'Gallon Sold By Current Cot';
                 break;
                 default:
                 listname = '';
                 break;
                 }
                 */
                //for (i = 0; i < 0; i++) {
                for (i = 0; i < testcount; i++) {
                    //for (i = 0; i < testcount; i++) {
                    //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                    (function (menuindex, testindex) {
                        it(listname, function () {
                            click_report(dropdown, menuindex, testindex); //0=Accounts
                        });
                    })(j, i);
                }
            }
        });
    }

    if (true) {
        describe('"Pricebook" modification', function () {
            var dropdown;
            beforeEach(function () {
                dropdown = element.all(by.repeater('item in modules')).get(0); //Get "Products"
                dropdown.click().then(showfooter);
            });
            var i;
            var testcount = browser.params.test.count;
            for (i = 0; i < testcount; i++) {
                //闭包函数参考：http://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters
                (function (testindex) {
                    it('Pricebook', function () {
                        click_pricebook_modify(dropdown, testindex); //0=products catalog; 1=pricebooks
                    });
                })(i);
            }
        });
    }
});
