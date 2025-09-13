// movement

const keys = {
    w: { pressed: false},
    a: { pressed: false},
    s: { pressed: false},
    d: { pressed: false}
}

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // up and down movement
    if(key === 'w' || key === 'arrowup'){ keys.w.pressed = true; }
    else if(key === 's' || key === 'arrowdown'){ keys.s.pressed = true; }

    // side to side movement
    if(key === 'a' || key === 'arrowleft'){ keys.a.pressed = true; }
    else if(key === 'd' || key === 'arrowright'){ keys.d.pressed = true; }

    if (e.key === 'Tab') {
        e.preventDefault();
        document.querySelector('.content').classList.toggle('hidden');
    }
    
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();

    switch (key){
        case 'w':{keys.w.pressed = false; break;}
        case 'a':{keys.a.pressed = false; break;}
        case 's':{keys.s.pressed = false; break;}
        case 'd':{keys.d.pressed = false; break;}
        case 'arrowup':{keys.w.pressed = false; break;}
        case 'arrowleft':{keys.a.pressed = false; break;}
        case 'arrowdown':{keys.s.pressed = false; break;}
        case 'arrowright':{keys.d.pressed = false; break;}
    }
});