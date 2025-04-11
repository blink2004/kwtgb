'use strict';

// Запрещаем автозапуск тестов
QUnit.config.autostart = false;

// QUnit.start(); // Написать в консоли для запуска автотестов

$(function(){
    // map.remove();

    QUnit.module("Map", function(hooks) {
        hooks.beforeEach(function () {
            // var fixture = document.getElementById('qunit-fixture');
            // fixture.innerHTML = '<div id="pageTitle"></div>';
        });

        QUnit.test('Нажать иконку Добавить точку', function(assert) {
            $('#addNewMarkerBtn').trigger('click');

            assert.true( $('#setMapMarkerHint').is(':visible'), 'Отображается подсказка о установке точки');
            assert.false( $('#settingsModalBox').is(':visible'), 'Панель настроек скрыта');
            assert.false( $('#settingsBtn').is(':visible'), 'Кнопка настроек скрыта');
            assert.true( $('#addNewMarkerBtn').css('background-color') == 'rgb(144, 238, 144)', 'Кнопка изменила свой стиль');
            assert.true( $("#reportInfoModal").is(':hidden'), 'Модальное окно для ввода данных перед отправкой скрыто');

            $('#addNewMarkerBtn').trigger('click'); // Restore
            assert.false( $('#setMapMarkerHint').is(':visible'), 'Скрывается подсказка о установке точки');
            assert.false( $('#settingsModalBox').is(':visible'), 'Панель настроек скрыта');
            assert.true( $('#settingsBtn').is(':visible'), 'Кнопка настроек отображается');
            assert.ok( $('#addNewMarkerBtn').css('background-color') == 'rgb(255, 255, 255)', 'Кнопка Добавить восстановила свой стиль');
        });

        QUnit.test('Нажать иконку Добавить точку и кликнуть где-то на карте', function(assert) {
            $('#addNewMarkerBtn').trigger('click');
            $('#map').trigger('click'); // Кликаем по карте

            assert.false( $('#setMapMarkerHint').is(':visible'), 'Подсказка о установке точки скрыта');
            assert.false( $('#settingsModalBox').is(':visible'), 'Панель настроек скрыта');
            assert.false( $('#settingsBtn').is(':visible'), 'Кнопка настроек скрыта');
            assert.false( $('#addNewMarkerBtn').is(':visible'), 'Кнопка добавления точки скрыта');

            assert.true( $("#reportInfoModal").is(':visible'), 'Отображается модальное окно для ввода данных перед отправкой');

            assert.equal( $('input[name="event_type"]:checked').val(), undefined, 'По умолчанию не выбран не один из типов события');
            // Пытаемся отправить пустую форму -> Сообщение, что нужно выбрать тип события и ввести текст
            /*$('#sendReportBtn').trigger('click');
            $('#reportDescription').val('a'); // Вводим 1 букву и снова пытаемся отправить

            $('#sendReportBtn').trigger('click');

            $('#reportDescription').val('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non luctus ipsum. Praesent fringilla libero sapien, ut porttitor est efficitur ut. Cras convallis gravida nisl sit amet pulvinar. Morbi in blandit ipsum. Aliquam porta urna vel ante consectetur tincidunt'); // Вводим длинный текст и снова пытаемся отправить
            $('#sendReportBtn').trigger('click');

            assert.true(); // Сообщение*/
            $('#green').trigger('click');
            assert.notEqual( $('input[name="event_type"]:checked').val(), undefined, 'Тип события выбран');
        });

        // QUnit.test('', function(assert) {});
        // QUnit.test('', function(assert) {});

    });

    QUnit.module("Settings", function(hooks) {
        hooks.beforeEach(function () {
            // var fixture = document.getElementById('qunit-fixture');
            // fixture.innerHTML = '<div id="pageTitle"></div>';
        });

        QUnit.test('Нажать иконку Настройки', function(assert) {
            $('#settingsBtn').trigger('click'); // Нажимаем кнопку Настройки

            assert.false( $('#settingsBtn').is(':visible'), 'Кнопка Настройки скрыта');
            assert.false( $('#addNewMarkerBtn').is(':visible'), 'Кнопка Настройки скрыта');
        });
    });
});


// https://stackoverflow.com/a/59561732 - work with Exception in QUnit
