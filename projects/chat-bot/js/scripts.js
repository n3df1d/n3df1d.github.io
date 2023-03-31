$(document).ready(() => {
    let name_user, city_user, tel_user

    const getChat = (who_writes, placeholder='', text, timeout=2000, next_func = () => {}) => {
        const ul = $("#chat_dialog")

        if (who_writes === 'bot'){
            $('.text-write').css('display', 'block')
            $('#input_text').attr('disabled', true)
            $('#button_send').attr('disabled', true)
            $('#input_text').attr('placeholder', '')

            setTimeout(() => {
                $('#chat_dialog').append(`<li class="bot my-3"><span class="p-2 px-3 rounded-3 text-white bg-secondary">${text}</span></li>`)
                ul.scrollTop(ul.prop('scrollHeight'))
                $('.text-write').css('display', 'none')
                $('#input_text').attr('disabled', false)
                $('#button_send').attr('disabled', false)
                $('#input_text').attr('placeholder', placeholder)
                $('#input_text').focus()
                next_func()
            }, timeout)
        }
        else if (who_writes === 'user') {
            $('#chat_dialog').append(`<li class="user my-3"><span class="p-2 px-3 rounded-3 text-white bg-success">${text}</span></li>`)
            ul.scrollTop(ul.prop('scrollHeight'))
            $('#input_text').val('')
        }
        else if (who_writes === 'file') {
            $('.text-write').css('display', 'block')
            $('#input_text').attr('disabled', true)
            $('#button_send').attr('disabled', true)
            $('#input_text').attr('placeholder', '')

            setTimeout(() => {
                $('#chat_dialog').append(`<li class="bot my-3"><span class="text-white bg-secondary rounded-3"><a href="${placeholder}" target="_blank" class=" p-2 px-3 d-flex justify-content-center align-items-center"><img width="50" src="/8681331601536080157.svg" alt="pdf"><h5 class="mx-2">${text}</h5></a></span></li>`)
                ul.scrollTop(ul.prop('scrollHeight'))
                $('.text-write').css('display', 'none')
                next_func()
            }, timeout)
        }
    }

    const theNext = (data) => {
        if (city_user === undefined){
            getChat('bot', data.whats_your_city.placeholder,`${data.whats_your_city.val.one} ${name_user}. ${data.whats_your_city.val.two}`)
        }
        else if (tel_user === undefined) {
            getChat('bot', data.whats_your_tel.placeholder, `${data.whats_your_tel.val}`)
            $('#input_text').mask("+7 (999) 999-99-99")
        }
        else if (tel_user !== undefined) {
            getChat('bot', '', `${data.thank_you.val}`, 2000, () => {
                getChat('file', data.presentation.link, 'Презентация ...' )
            })
        }
    }
    
    const btnClick = (data) => {
        if ($('#input_text').val() != ''){
            if (name_user === undefined){
                name_user = $('#input_text').val()
                getChat('user', '', $('#input_text').val())
                theNext(data)
            }
            else if (city_user === undefined){
                city_user = $('#input_text').val()
                getChat('user', '', $('#input_text').val())
                theNext(data)
            }
            else if (tel_user === undefined){
                tel_user = $('#input_text').val()
                getChat('user', '', $('#input_text').val())
                theNext(data)
            }
        }
    }
    
    
    $.getJSON('js/answers.json', (data) => {
        getChat('bot', '', data.hello, 3000, () => {
            getChat('bot', data.whats_your_name.placeholder,  data.whats_your_name.val)
        })

        $('#button_send').click(() => btnClick(data))
        $('#input_text').keydown(e => {
            if(e.keyCode === 13) {
                btnClick(data)
            }
        });
    })

})
