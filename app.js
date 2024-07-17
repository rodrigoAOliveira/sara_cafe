function groupByMonth(data) {
    return data.reduce((acc, item) => {
        const [day, month, year] = item.date.split('/');
        const date = new Date(year, month - 1, day);
        const monthYear = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push({...item, date: new Date(year, month - 1, day)});
        return acc;
    }, {});
}

function renderSchedule() {
    console.log('Iniciando renderSchedule');
    const scheduleList = document.getElementById('schedule-list');
    if (!scheduleList) {
        console.error('Elemento schedule-list não encontrado');
        hideSplashScreen();
        return;
    }

    const groupedData = groupByMonth(scheduleData);
    const currentDate = new Date();

    for (const [month, items] of Object.entries(groupedData)) {
        if (items[0].date < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
            continue;
        }

        const monthElement = document.createElement('div');
        monthElement.className = 'month';

        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = month;
        monthElement.appendChild(monthHeader);

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'schedule-item';
            itemElement.innerHTML = `<span class="date">${item.date.toLocaleDateString('pt-BR')}</span> ${item.team}`;
            monthElement.appendChild(itemElement);
        });

        scheduleList.appendChild(monthElement);
    }
    console.log('Renderização concluída');
    hideSplashScreen();
}

function hideSplashScreen() {
    console.log('Tentando ocultar o splash screen');
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        setTimeout(() => {
            splashScreen.remove();
            console.log('Splash screen removido');
        }, 50000);
    } else {
        console.error('Elemento splash-screen não encontrado');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded disparado');
    
    setTimeout(hideSplashScreen, 50000);

    try {
        renderSchedule();
    } catch (error) {
        console.error('Erro ao renderizar o cronograma:', error);
        hideSplashScreen();
    }
});