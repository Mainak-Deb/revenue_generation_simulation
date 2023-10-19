var month = 0;
var totalRevenue=0;
var estimatedOnsite=0;
var estimatedOffsite=0;
var ratio=0;
var denom =0;

var usedOnshore =0;
var usedOffshore =0;

var pastCum=0;
var postcomp=0;
var tillon=0;
var tilloff=0;

var mastertable=[];



class master{
    constructor(month,rev,cumrev,onpmb,offpmb,oncma,offcma,onbtg,offbtg,poc,totalrev){
        this.month=month;
        this.rev=rev;
        this.cumrev=cumrev;
        this.onpmb=onpmb;
        this.offpmb=offpmb;
        this.oncma=oncma;
        this.offcma=offcma;
        this.onbtg=onbtg;
        this.offbtg=offbtg;
        this.poc=poc;
        this.totalrev=totalrev;
    }
}

function validateAndSetRevenue() {
    var totalRevenueInput = document.getElementById('totalRevenue');
    var estimatedOnsiteInput = document.getElementById('estimatedOnsite');
    var estimatedOffsiteInput = document.getElementById('estimatedOffsite');
    var ratioInput = document.getElementById('ratio');
  
    if (totalRevenueInput.value === '' ||
        estimatedOnsiteInput.value === '' ||
        estimatedOffsiteInput.value === '' ||
        ratioInput.value === '') {
      alert('Please fill in all required fields.');
    } else {
      // All fields are filled; proceed with your logic (e.g., call setRevenue())
      setRevenue();
      document.getElementById("create-btn").style.display = 'none';
      document.getElementById("cr-button").style.display = 'flex';
      document.getElementById("change-button").style.display = 'none';
    }
  }



function changeRequest(){
    document.getElementById("totalRevenue").disabled = false;
    document.getElementById("cr-button").style.display = 'none';
    document.getElementById("change-button").style.display = 'flex';

}

function changeTotalrevenue(){
    totalRevenue=parseFloat(document.getElementById("totalRevenue").value);
    document.getElementById("cr-button").style.display = 'flex';
    document.getElementById("change-button").style.display = 'none';
    document.getElementById("totalRevenue").disabled = true;
    
}
  

function setRevenue(){
    console.log("setRevenue");
    totalRevenue=parseFloat(document.getElementById("totalRevenue").value);
    estimatedOnsite=parseFloat(document.getElementById("estimatedOnsite").value);
    estimatedOffsite=parseFloat(document.getElementById("estimatedOffsite").value);
    ratio=parseFloat(document.getElementById("ratio").value);
    denom=estimatedOnsite*ratio+estimatedOffsite;
    console.log('denom:', denom)
    
    document.getElementById("totalRevenue").disabled = true;
    document.getElementById("estimatedOnsite").disabled = true;
    document.getElementById("estimatedOffsite").disabled = true;
    document.getElementById("ratio").disabled = true;


    document.getElementById("maintable").style.display="block";
    document.getElementById("onsitePMB").value=estimatedOnsite;
    document.getElementById("offsitePMB").value=estimatedOffsite;
}

function calculate(){
    var onCMA=parseFloat(document.getElementById("onsiteCMA").value);
    var offCMA=parseFloat(document.getElementById("offsiteCMA").value);
    var onBTG=parseFloat(document.getElementById("onsiteBTG").value);
    var offBTG=parseFloat(document.getElementById("offsiteBTG").value);

    var tillnowTotalWork=0;

    for(let i of mastertable){
        tillnowTotalWork += (i.oncma * ratio)+i.offcma;
    }
    tillnowTotalWork= tillnowTotalWork + (onCMA*ratio+offCMA);
    var poc =( tillnowTotalWork / (tillnowTotalWork+(onBTG*ratio)+offBTG))*100;

    cumRev = poc/100*totalRevenue;
    currRev=cumRev;
    if(mastertable.length>0){
        currRev=cumRev-mastertable[mastertable.length-1].cumrev;
    }
    month=month+1;

    if(mastertable.length>0){
        mastertable.push( new master(month,currRev,cumRev,mastertable[mastertable.length-1].onbtg,mastertable[mastertable.length-1].offbtg,onCMA,offCMA,onBTG,offBTG,poc,totalRevenue))
    }else{
        mastertable.push( new master(month,currRev,cumRev,estimatedOnsite,estimatedOffsite,onCMA,offCMA,onBTG,offBTG,poc,totalRevenue))
    }
 
    var htmlbody=``;

    for(let i of mastertable){
        console.log(i)
        if(i.rev<0){
            htmlbody +=`<tr>
                        <td>${i.month}</td>
                        <td style="color:red">${i.rev.toFixed(2)}</td>
                        <td style="color:red">${i.cumrev.toFixed(2)}</td>
                        <td style="color:red">${i.onpmb}</td>
                        <td style="color:red">${i.offpmb}</td>
                        <td style="color:red">${i.oncma}</td>
                        <td style="color:red">${i.offcma}</td>
                        <td style="color:red">${i.onbtg}</td>
                        <td style="color:red">${i.offbtg}</td>
                        <td style="color:red">${i.poc.toFixed(2)}%</td>
                        <td style="color:red">${i.totalrev}</td>
                        <td >Finished</td>
                    </tr>`
        }else{
            htmlbody +=`<tr>
                        <td>${i.month}</td>
                        <td style="color:green">${i.rev.toFixed(2)}</td>
                        <td style="color:green">${i.cumrev.toFixed(2)}</td>
                        <td style="color:green">${i.onpmb}</td>
                        <td style="color:green">${i.offpmb}</td>
                        <td style="color:green">${i.oncma}</td>
                        <td style="color:green">${i.offcma}</td>
                        <td style="color:green">${i.onbtg}</td>
                        <td style="color:green">${i.offbtg}</td>
                        <td style="color:green" >${i.poc.toFixed(2)}%</td>
                        <td style="color:green">${i.totalrev}</td>
                        <td>Finished</td>
                    </tr>`
        }
        
    }
    document.getElementById('tablebody').innerHTML =htmlbody;    
}

function add(){
    var onBTG=parseFloat(document.getElementById("onsiteBTG").value);
    var offBTG=parseFloat(document.getElementById("offsiteBTG").value);
    calculate();
    if ((onBTG!=0) || (offBTG!=0)){
        document.getElementById('tablebody').innerHTML+=`
                <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td><input type="text" id="onsitePMB" value=${mastertable[mastertable.length-1].onbtg} disabled></td>
                        <td><input type="text" id="offsitePMB" value=${mastertable[mastertable.length-1].offbtg} disabled></td>
                        <td><input type="text" id="onsiteCMA" ></td>
                        <td><input type="text" id="offsiteCMA" ></td>
                        <td><input type="text" id="onsiteBTG" ></td>
                        <td><input type="text" id="offsiteBTG" ></td>
                        <td>-</td>
                        <td><button class="add-button"  onclick="add()" >Add</button></td>
                    </tr>
                        `
    }
    setGraph();
   
}



function setGraph(){
    var ctx = document.getElementById('myLineChart').getContext('2d');
    var existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }

    var months=[]
    var monthvalues=[]

    for(let i of mastertable){
        months.push("Month "+String(i.month))
        monthvalues.push(i.rev)
    }
    var col='rgb(75, 192, 192)'

    
    if(monthvalues.length>0){
        if(monthvalues[monthvalues.length-1]<0){
            col='rgb(255, 19, 19)'
        }
    }

    console.log(months,monthvalues,col,monthvalues[monthvalues.length-1]);

    var data = {
        labels:months,
        datasets: [{
            label: 'Revenue chart',
            data: monthvalues,
            borderColor: col, // Line color
            borderWidth: 2, // Line width
            backgroundColor: 'rgb(255,255,255)',
            fill: false // Do not fill the area under the line
        }]
    };



    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });
}