document.addEventListener('DOMContentLoaded', function () {
    // Load default data on page load
    selectItem('Seasonal Disease');
});

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
}

function selectItem(item) {
    // Load data from JSON based on the selected item
    fetch('senti.json')
        .then(response => response.json())
        .then(jsonData => {
            var selectedData = jsonData.diseases[item];
            // Destroy existing Chart instance if it exists
            var existingChart = Chart.getChart('myPieChart');
            if (existingChart) {
                existingChart.destroy();
            }

            var neg= selectedData.negative;
            var pos= selectedData.positive;
            document.getElementById('dynamicValue').innerHTML=neg;
            document.getElementById('dynamicValueDeaths').innerHTML=pos;
            document.getElementById('diseasesname').innerHTML=item;
            document.getElementById('piecharttitle').innerHTML="Sentiment Analysis of "+item;
            

            // Calculate percentage values
            var total = selectedData.negative + selectedData.positive;
            var negativePercentage = ((selectedData.negative / total) * 100).toFixed(2);
            var positivePercentage = ((selectedData.positive / total) * 100).toFixed(2);

            // Generate pie chart using Chart.js
            var ctx = document.getElementById('myPieChart').getContext('2d');
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [`Negative (${negativePercentage}%)`, `Positive (${positivePercentage}%)`],
                    datasets: [{
                        data: [selectedData.negative, selectedData.positive],
                        backgroundColor: ['#FF5733', '#33FF57']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Hide the dropdown after selection
            var dropdownMenu = document.getElementById("dropdownMenu");
            dropdownMenu.style.display = 'none';
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
