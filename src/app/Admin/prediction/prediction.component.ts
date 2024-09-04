import {Component, OnInit} from '@angular/core';
import {PredictionService} from "../../services/services/prediction/prediction.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
  selectedArticle: string = '';
  display_cost:any;
  isProject = false;
  cost_val:number = 0;
  public barChartOptions2: any;
  projectForm:FormGroup;
budget:number=0;
  articleForm: FormGroup;
  cost:any;
   cost_pred = [
     {'Ressources':'Analyste concepteur','Coût unitaire': 950,'J/H Vendus':0},
     {'Ressources':'Consultant SEO','Coût unitaire': 800,'J/H Vendus':0},
     {'Ressources':'Formation','Coût unitaire':600,'J/H Vendus':0},
     {'Ressources':'Infographie ','Coût unitaire': 900,'J/H Vendus':0}, // Removed extra quotes
     {'Ressources':'Ingénieur système','Coût unitaire': 750,'J/H Vendus':0},
     {'Ressources':'Gestion et coordination du projet','Coût unitaire': 850,'J/H Vendus':0},
     {'Ressources':'Ingénieur test','Coût unitaire': 700,'J/H Vendus':0},
     {'Ressources': 'Insertion contenu','Coût unitaire': 800,'J/H Vendus':0},
     {'Ressources':'Intégration','Coût unitaire': 850,'J/H Vendus':0}
  ]
  articles = {
    Drupal: [
      'Infographie ',
      'Intégration',
      'Insertion contenu',
      'Ingénieur test',
      'Ingénieur système',
      'Consultant SEO',
      'Formation'
    ],
    Spécifique: [
      'Gestion et coordination du projet',
      'Analyste concepteur',
      'Infographie',
      'Intégration',
      'Développement ',
      'Ingénieur test',
      'Ingénieur système',
      'Formation'
    ],
    Application_mobile: ['Article X', 'Article Y', 'Article Z'],
    Prestashop: ['Article X', 'Article Y', 'Article Z'],
  };
  filteredArticles: string[] = [];
  predictions: any ;
  prediction:any;

  constructor(
    private apiService: PredictionService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,private snackBar:MatSnackBar
  ) {
    this.articleForm = this.fb.group({
      typeProject: [''],
      articleName: [''],
      analyste_concepteur: [0],
      gestion_et_coordination_du_projet: [0],
      ingenieur_systeme: [0],
      ingenieur_test: [0],
      insertion_contenu: [0],
      infographie: [0],
    });
    this.projectForm=this.fb.group({
      gestionCoordination: [''],
      analysteConcepteur: [''],
    })
  }

  ngOnInit() {
    this.articleForm.get('typeProject')?.valueChanges.subscribe(value => {
      this.onTypeProjectChange(value);
    });

    this.articleForm.get('articleName')?.valueChanges.subscribe(value => {
      this.selectedArticle = value;
    });


  }

  onTypeProjectChange(typeProject: string) {
    // @ts-ignore
    this.filteredArticles = this.articles[typeProject] || [];
    this.articleForm.get('articleName')?.setValue(this.filteredArticles[0] || '');
  }

  onSubmitArticleForm() {
    const formValue = this.articleForm.value;
    console.log('Article Form Value:', formValue);
  }

  getPredictionInsertionContenu() {
    const data = {
      'Analyste concepteur': this.articleForm.get('analyste_concepteur')?.value,
      'Gestion et coordination du projet': this.articleForm.get('gestion_et_coordination_du_projet')?.value,
    };
    this.apiService.predictInsertionContenu(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.insertionContenu = response.prediction;
        console.log('Insertion Contenu Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionIngenieurSysteme() {
    const data = {
      'Gestion et coordination du projet': this.articleForm.get('gestion_et_coordination_du_projet')?.value,
    };
    this.apiService.predictIngenieurSysteme(data).subscribe(
      response => {
        this.prediction=response.prediction;
        this.predictions.ingenieurSysteme = response.prediction;
        console.log('Ingenieur Systeme Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionIngenieurTest() {
    const data = {
      'Gestion et coordination du projet': this.articleForm.get('gestion_et_coordination_du_projet')?.value,
      'Ingénieur système': this.articleForm.get('ingenieur_systeme')?.value,
    };
    this.apiService.predictIngenieurTest(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.ingenieurTest = response.prediction;
        console.log('Ingenieur Test Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionSeo() {
    const data = {
      'Analyste concepteur': this.articleForm.get('analyste_concepteur')?.value,
      'Gestion et coordination du projet': this.articleForm.get('gestion_et_coordination_du_projet')?.value,
    };
    this.apiService.predictSeo(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.seo = response.prediction;
        console.log('SEO Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionIntegration() {
    const data = {
      'Ingénieur système': this.articleForm.get('ingenieur_systeme')?.value,
      'Ingénieur test': this.articleForm.get('ingenieur_test')?.value,
      'Infographie ': this.articleForm.get('infographie')?.value,
    };
    this.apiService.predictIntegration(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.integration = response.prediction;
        console.log('Integration Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionInfographie() {
    const data = {
      'Analyste concepteur': this.articleForm.get('analyste_concepteur')?.value,
      'Insertion contenu': this.articleForm.get('insertion_contenu')?.value,
    };
    this.apiService.predictInfographie(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.infographie = response.prediction;
        console.log('Infographie Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getPredictionFormation() {
    const data = {
      'Gestion et coordination du projet': this.articleForm.get('gestion_et_coordination_du_projet')?.value,
    };
    this.apiService.predictFormation(data).subscribe(
      response => {
        this.prediction=response.prediction;

        this.predictions.formation = response.prediction;
        console.log('Formation Prediction:', response.prediction);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  keys(obj: any): string[] {
    return Object.keys(obj);
  }
  getPredictionAll() {
    const gestionCoordination = this.projectForm.get('gestionCoordination')?.value;
    const analysteConcepteur = this.projectForm.get('analysteConcepteur')?.value;
    this.apiService.predictAll(analysteConcepteur, gestionCoordination).subscribe(
      response => {
        this.predictions = response;
        console.log('All Predictions:', response);
        this.showSnackBar('Prédection successful!', 'success');
        this.generateChart();
        this.calculprofitability();
        this.updateCostPred();
        console.log(this.cost_pred)
        this.predictCost();
      },
      error => {
        console.error('There was an error!', error);
        this.showSnackBar('Entrer Des chiffres Valides', 'erreur')
      }
    );

  }


  generateChart(){
    const seriesData = [{
      name: 'Durée',
      data: Object.values(this.predictions)
    }];

    this.barChartOptions2 = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 400,
        width: '95%'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",


        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],

      },
      xaxis: {
        categories: [
          'Analyste concepteur',
          'Consultant SEO',
          'Formation',
          'Gestion et coordination du projet',
          'Infographie',
          'Ingénieur système',
          'Ingénieur test',
          'Insertion contenu',
        'Intégration']
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return  val + " Jours";
          }
        }
      },
      colors: ['#0CB3D7', '#FBB431', '#FF4560'],

    };
  }
  refreshPage() {
    window.location.reload();
  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: action === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
  calculprofitability(): void {
    const roles = {
      'Analyste concepteur': 950,
      'Consultant SEO': 800,
      'Formation': 600,
      'Infographie ': 900, // Removed extra quotes
      'Ingénieur système': 750,
      'Gestion et coordination du projet': 850,
      'Ingénieur test': 700,
      'Insertion contenu': 800,
      'Intégration': 850,
    };

    this.budget = Object.keys(roles).reduce((acc, role) => {
      const prediction = this.predictions[role] || 0; // Default to 0 if undefined
      // @ts-ignore
      return acc + prediction * roles[role];
    }, 0);
  }
   updateCostPred(): void {
    this.cost_pred.forEach(item => {
      const resource = item['Ressources'];
      if (this.predictions[resource] !== undefined) {
        item['J/H Vendus'] = this.predictions[resource];
      }
    });
  }
  predictCost(){
    this.apiService.predictCost(this.cost_pred).subscribe(
      response => {
        this.cost=response;
        const sum = this.cost.predictions.reduce((acc: any, value: any) => acc + value, 0);
        this.cost_val=sum;
        this.display_cost=this.cost.predictions;
        console.log("heloooooo",this.cost.predictions);

      },error => {
        console.log(error)
      }
    )
  }
}









