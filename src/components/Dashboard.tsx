import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Plane, ShoppingCart, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

interface Request {
  id: string;
  type: 'ethics' | 'visit' | 'travel' | 'purchase';
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  requester: string;
}

const mockRequests: Request[] = [
  { id: '1', type: 'ethics', title: 'Demande comité éthique - Client OSI-2024', status: 'pending', date: '22/09/2025', requester: 'Jean Dupont' },
  { id: '2', type: 'visit', title: 'Visite client - Salle Terre', status: 'approved', date: '21/09/2025', requester: 'Marie Martin' },
  { id: '3', type: 'travel', title: 'Voyage professionnel - Berlin', status: 'pending', date: '20/09/2025', requester: 'Pierre Durant' },
  { id: '4', type: 'purchase', title: 'Achat matériel - Amazon', status: 'approved', date: '19/09/2025', requester: 'Sophie Leroy' },
];

const requestTypes = [
  {
    type: 'ethics' as const,
    title: 'Comité Éthique',
    description: 'Demandes d\'analyse éthique pour les projets commerciaux',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    count: mockRequests.filter(r => r.type === 'ethics').length,
  },
  {
    type: 'visit' as const,
    title: 'Visite Externe',
    description: 'Gestion des visites clients et partenaires',
    icon: Users,
    color: 'from-green-500 to-green-600',
    count: mockRequests.filter(r => r.type === 'visit').length,
  },
  {
    type: 'travel' as const,
    title: 'Voyage Professionnel',
    description: 'Demandes de déplacements et missions',
    icon: Plane,
    color: 'from-purple-500 to-purple-600',
    count: mockRequests.filter(r => r.type === 'travel').length,
  },
  {
    type: 'purchase' as const,
    title: 'Demande d\'Achat',
    description: 'Achats de matériel et services',
    icon: ShoppingCart,
    color: 'from-orange-500 to-orange-600',
    count: mockRequests.filter(r => r.type === 'purchase').length,
  },
];

interface DashboardProps {
  onCreateRequest: (type: string) => void;
  onViewRequests: (type?: string) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-warning" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return 'Approuvé';
    case 'rejected':
      return 'Refusé';
    default:
      return 'En attente';
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved':
      return 'default' as const;
    case 'rejected':
      return 'destructive' as const;
    default:
      return 'secondary' as const;
  }
};

export default function Dashboard({ onCreateRequest, onViewRequests }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Gestion des Demandes
        </h1>
        <p className="text-muted-foreground text-lg">
          Tableau de bord pour gérer vos demandes d'entreprise
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {requestTypes.map((requestType) => {
          const Icon = requestType.icon;
          return (
            <Card key={requestType.type} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${requestType.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {requestType.title}
                </CardTitle>
                <Icon className={`h-4 w-4 text-primary`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{requestType.count}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {requestType.description}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={() => onCreateRequest(requestType.type)}
                    className="flex-1"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Créer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onViewRequests(requestType.type)}
                    className="flex-1"
                  >
                    Voir tout
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Demandes Récentes</CardTitle>
          <Button variant="outline" onClick={() => onViewRequests()}>
            Voir toutes les demandes
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-card to-accent/20 hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <Badge variant={getStatusVariant(request.status)}>
                      {getStatusText(request.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">{request.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Par {request.requester} • {request.date}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Voir détails
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}