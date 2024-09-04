import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProjectService} from "../../services/services/Project/project.service";
import {NotificationService} from "../../services/services/notification.service";
import {Notification} from "../../services/models/Notification";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ArticlesService} from "../../services/services/Articles/articles.service";
import {MatDialog} from "@angular/material/dialog";
import {DescriptionDialogComponent} from "./description-dialog/description-dialog.component";
import {ArticleAnalysis} from "../../services/models/ArticleAnalysis";
import {TokenService} from "../../services/services/token/token.service";

interface Article {
  id: number;
  date_début: string;
  date_fin: string;
  ressources: string;
  j_Vendus: number;
  coût_unitaire: number;
  consommés_H: number;
  consommés_J: number;
  attérissage: number;
  couts: number;
  satisfaction_score: number | null;
  status: string;
  budget_Additionnel: number;
  marge_en_percent: number;
  marge_en_montant: number;
  budget: number;
  marge: number;
  raf: number;
  j_Restant: number;
}

interface Project {
  id: number;
  date_début: string;
  date_fin: string;
  name: string;
  type: string;
  status: string;
  client: string | null;
  articles: Article[];
  article: Article;
  chef_de_projet: string;
}
interface ProjectDrupal {
  [key:string]: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {
  public donutChartOptions3: any;
  donutChartOptions4: any;
  donutChartOptions5: any;
  public barChartOptions2: any;
  completedPageSize: number = 5;
  inProgressPageSize: number = 5;
  project?:Project;
  projectsPreData?: { [key: string]: ProjectDrupal };
  projectsPredictedData?: { [key: string]: ProjectDrupal };
  result:any;
  performance:any;
   completedProjects:Project[]=[];
  displayedColumns: string[] = ['title', 'totalmarge', 'totaladddays','ratio_r','ratio_p'];
  analysisdataSource: MatTableDataSource<ArticleAnalysis>;
  userConnected:any;
  completedDataSource: MatTableDataSource<Notification>;
  inProgressDataSource: MatTableDataSource<Notification>;
  completedDisplayedColumns: string[] = ['title', 'description', 'productivity', 'profitability'];
  inProgressDisplayedColumns: string[] = ['title', 'description', 'productivity','profitability'];


  @ViewChild('completedPaginator') completedPaginator?: MatPaginator;
  @ViewChild('inProgressPaginator') inProgressPaginator?: MatPaginator;
  @ViewChild('completedSort') completedSort?: MatSort;
  @ViewChild('inProgressSort') inProgressSort?: MatSort;
  @ViewChild('analysisSort') analysisSort?: MatSort;
  ngOnInit(): void {
    this.userConnected = this.tokenService.getUserId();
    this.getProjectPredictedInprogress();
    this.getStatusArticle();
    this.fetchCompletedProjects();
    this.loadCompletedNotifications();
    this.loadInProgressNotifications();
    this.checkPerformanceCompleted();

    this.articleS.getArticleAnalysis().subscribe(data => {
      this.analysisdataSource.data = data;
     // @ts-ignore
      this.analysisdataSource.sort=this.analysisSort;


    },error => {
      console.log(error);
    });

  }
  ngAfterViewInit(): void {
    // @ts-ignore
    this.completedDataSource.paginator = this.completedPaginator;
    // @ts-ignore
    this.completedDataSource.sort = this.completedSort;
    // @ts-ignore
    this.inProgressDataSource.paginator = this.inProgressPaginator;
    // @ts-ignore
    this.inProgressDataSource.sort = this.inProgressSort;
    // @ts-ignore
    this.analysisdataSource.sort=this.analysisSort;

  }
  constructor(private service:ProjectService,private notif:NotificationService, private dialog: MatDialog,
              private tokenService:TokenService,private articleS:ArticlesService) {
    this.completedDataSource = new MatTableDataSource<Notification>();
    this.inProgressDataSource = new MatTableDataSource<Notification>();
   this.analysisdataSource = new MatTableDataSource<ArticleAnalysis>();
  }
  getStatusArticle(){
    this.service.getProjectDetails().subscribe(data => {
        this.result=data;

        console.log("getting project data",data);
        this.donutChartOptions3 = {
          title: {
            text: 'Analyse Des Articles',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '14px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238',

            },
          },
          series: [this.result['completed articles'], this.result['in_progress articles']],
          chart: {
            type: 'donut',
            height: 150,

          },
          labels : ["Terminé", "En cours"],
          colors: ['#0CB3D7', '#FBB431' ],
          fill: {
            colors: ['#0CB3D7', '#FBB431']
          }
        };

      },
      error => {
        console.error('There was an error!', error);
      })


  }
  generateChartOptions1() {
    if (!this.projectsPreData || !this.projectsPredictedData) {
      return;
    }

    const categories = Object.keys(this.projectsPreData);

    // Extract unique roles/tasks
    const uniqueRoles = new Set<string>();
    categories.forEach(key => {
      const project = this.projectsPreData![key];
      Object.keys(project).forEach(role => uniqueRoles.add(role));
    });

    // Create series data for each role
    const seriesData = Array.from(uniqueRoles).map(role => {
      return {
        name: role,
        data: categories.map(key => {
          const project = this.projectsPreData![key];
          return project[role] !== 0 ? project[role] : null; // Return the value or 0 if it doesn't exist
        })
      };
    });

    // Create goals based on predicted data
    const goals = categories.map(key => {
      const project = this.projectsPredictedData![key];
      return Object.entries(project).map(([role, value]) => ({
        name: role,
        value: value,
        strokeHeight: 5,
        strokeColor: '#FF4560'
      }));
    }).flat();

    this.barChartOptions2 = {
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }},
   /*  title: {
        text: 'Analyse Prédictif',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238',

        },
      }, */
      series: seriesData,
      chart: {
        type: "bar",
        height: 450
      }, title: {
        text: 'Prédiction des projets drupal',
        align: 'center',
        floating: true,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238',


        }
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          goals: goals,

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
        categories: categories
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
  getProjectPredictedInprogress() {
    this.service.getProjectPredictionInprogress().subscribe(
      (predictedData: { [key: string]: ProjectDrupal }) => {
        this.projectsPredictedData = predictedData;
        this.service.getProjectInprogress().subscribe(
          (actualData: { [key: string]: ProjectDrupal }) => {
            this.projectsPreData = actualData;
            this.generateChartOptions1();
            console.log("actual", actualData);
            console.log("predicted", predictedData);
          },
          error => {
            console.log("error fetching actual data");
          }
        );
      },
      error => {
        console.log("error to predict");
      }
    );
  }
  loadCompletedNotifications() {
    this.notif.findNotificationForProjectCompleted().subscribe(
      (notifications: Notification[]) => {
        this.completedDataSource.data = notifications;
        // @ts-ignore
        this.completedDataSource.paginator = this.completedPaginator;
        // @ts-ignore
        this.completedDataSource.sort = this.sort;
      },
      error => {
        console.error('Error loading completed notifications:', error);
      }
    );
  }
  loadInProgressNotifications() {
    this.notif.findNotificationForProjectInProgress().subscribe(
      (notifications: Notification[]) => {
        this.inProgressDataSource.data = notifications;
        // @ts-ignore
        this.inProgressDataSource.paginator = this.inProgressPaginator;
        // @ts-ignore
        this.inProgressDataSource.sort = this.sort;
      },
      error => {
        console.error('Error loading in-progress notifications:', error);
      }
    );
  }
  displayProductivity(productivity: string): string {
    switch (productivity) {
      case 'Dangerous':
        return 'Mauvaise';
      case 'Successful':
        return 'Excellente';
      case 'Normal':
        return 'Normale';
      case 'Warning':
        return 'Alerte';
      default:
        return productivity;
    }
  }
  displayProfitability(profitability: string): string {
    switch (profitability) {
      case 'Dangerous':
        return 'Mauvaise';
      case 'Successful':
        return 'Excellente';
      case 'Normal':
        return 'Normale';
      case 'Warning':
        return 'Alerte';
      default:
        return profitability;
    }
  }
  fetchCompletedProjects() {
    this.service.getCompletedProjects().subscribe((projects: any[]) => {
      this.completedProjects = projects;
    });
  }
  applyFilter(event: Event, table: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (table === 'completed') {
      this.completedDataSource.filter = filterValue;
      if (this.completedDataSource.paginator) {
        this.completedDataSource.paginator.firstPage();
      }
    } else {
      this.inProgressDataSource.filter = filterValue;
      if (this.inProgressDataSource.paginator) {
        this.inProgressDataSource.paginator.firstPage();
      }
    }
  }
  openDescriptionDialog(description: string): void {
    this.dialog.open(DescriptionDialogComponent, {
      data: { description }
    });
  }
  checkPerformanceCompleted(){
    this.notif.checkPerformanceCompleted().subscribe(
        response => {
          console.log('Performance Data:', response);
          this.generateDonutCharts(response);
        },
      error => {
        console.error('There was an error fetching performance data!', error);
      }
    );
  }
  generateDonutCharts(data: any) {
    const productiviteData = data.Productivité;
    const rentabiliteData = data.Rentabilité;

    this.donutChartOptions4 = {
      series: Object.values(productiviteData),
      chart: {
        type: "donut",
        height: 200
      },
      labels: Object.keys(productiviteData),
      title: {
        text: 'Productivité',
        align: 'center',
        style:{

        }
      },
      colors: ['#dc3545', '#198754', '#0d6efd'],
      fill: {
        colors: ['#dc3545', '#198754', '#0d6efd']
      }
    };

    this.donutChartOptions5 = {
      series: Object.values(rentabiliteData),
      chart: {
        type: "donut",
        height: 200
      },
      labels: Object.keys(rentabiliteData),
      title: {
        text: 'Rentabilité',
        align: 'center',

      },
      colors: ['#dc3545', '#198754', '#0d6efd'],
      fill: {
        colors: ['#dc3545', '#198754', '#0d6efd']
      }
    };
  }
  displayProfitabilityT(profitability: string): string {
    switch (profitability) {
      case 'Normal':
        return 'Stable';
      case 'Warning':
        return 'Elevée';
      default:
        return profitability;
    }
  }
}
