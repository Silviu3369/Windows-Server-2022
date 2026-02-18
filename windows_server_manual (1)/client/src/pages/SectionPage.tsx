import { useParams, useLocation } from "wouter";
import { manualSections } from "@/lib/manualContent";
import Layout from "@/components/Layout";
import { Streamdown } from "streamdown";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, Play } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Diagram, { ADStructureDiagram, FileServerPermissionsDiagram, GPOApplicationOrderDiagram, RAIDLevelsDiagram, DNSResolutionDiagram } from "@/components/Diagram";
import { getVideosForSection } from "@/lib/videoMappings";
import { useState, useEffect } from "react";

// Imagini pentru secțiuni
const sectionImages: Record<string, Array<{ src: string; alt: string; caption?: string }>> = {
  groups: [
    {
      src: "https://private-us-east-1.manuscdn.com/sessionFile/T2NeknTWTMMr8EPnLiL5e7/sandbox/dZPzv3ywy5GXb2vF6Wx9si-img-1_1770801092000_na1fn_Z3JvdXBzLWhpZXJhcmNoeQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDJOZWtuVFdUTU1yOEVQbkxpTDVlNy9zYW5kYm94L2RaUHp2M3l3eTVHWGIydkY2V3g5c2ktaW1nLTFfMTc3MDgwMTA5MjAwMF9uYTFmbl9aM0p2ZFhCekxXaHBaWEpoY21Ob2VRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KxHRBJAS-RrXGVJTvQdciMLhV4MaUkQXyfQLu1vK4zcoRoT5Q5KHhWpsw~RSDVONweH5aMv-9myTfWCaYcEgEDz8f1wO2mJR0UURF8Bvfa3TjPp-jzWIixNl3ZeEIw6rk3bzh8bhBXXknfObUwn~P~pBvzty07wsv1EwPu0B3Cdkgd~U3O2pwUHOfcdsnOBifEmLLBcygUuUkvW2uwyeeIY4F4783noj3L7F~U2VAwBMLsqOw9dCMfUONFaZiQVDdWLk7y6dBFIfrsQWBaZpK0ssr51N71mOrhbv2BybCPownvkM3s01iv-~6ZlJykbsr7B1LJMOC4d~O~mQFc3ziA__",
      alt: "Active Directory Group Hierarchy",
      caption: "Ierarhia grupurilor în Active Directory: Local, Global și Domain Local"
    }
  ],
  permissions: [
    {
      src: "https://private-us-east-1.manuscdn.com/sessionFile/T2NeknTWTMMr8EPnLiL5e7/sandbox/dZPzv3ywy5GXb2vF6Wx9si-img-2_1770801098000_na1fn_bnRmcy1wZXJtaXNzaW9ucy1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDJOZWtuVFdUTU1yOEVQbkxpTDVlNy9zYW5kYm94L2RaUHp2M3l3eTVHWGIydkY2V3g5c2ktaW1nLTJfMTc3MDgwMTA5ODAwMF9uYTFmbl9iblJtY3kxd1pYSnRhWE56YVc5dWN5MW1iRzkzLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=b3kFYy69oGmx-aGH1xu64GNptEF90ZIyAvQAEl7bzyjyv90nWwKDTEG17qlofk-AukPv26-n01UOtWTesCmdnGZCPbi4z88txOunu1rsnhUz2Lu-HPF8eGa48O1a8GHnqk7rJVzZk6ISt3KZtiGXNj8RY9bHhkG2Rc9iTpLr8vnYTEZ8-xsPoO7GvoaoLnCFxMyU4QTzn95~S9eTmFbflsz~jlxzCL5nH8ZdckJ5wRbx7mbIhd9WLikgC1tEXnrrEODMI0nwuhlTAq2VtdKUKCR1n36kRvnnJgIlkmZ4iFEKJEywh5EFRIgF4XWGipYjmtCBIp-F6JpJB95M66B3Qg__",
      alt: "NTFS Permissions Hierarchy",
      caption: "Ierarhia permisiunilor NTFS și moștenire"
    },
    {
      src: "https://private-us-east-1.manuscdn.com/sessionFile/T2NeknTWTMMr8EPnLiL5e7/sandbox/dZPzv3ywy5GXb2vF6Wx9si-img-3_1770801089000_na1fn_c2hhcmUtcGVybWlzc2lvbnMtbWF0cml4.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDJOZWtuVFdUTU1yOEVQbkxpTDVlNy9zYW5kYm94L2RaUHp2M3l3eTVHWGIydkY2V3g5c2ktaW1nLTNfMTc3MDgwMTA4OTAwMF9uYTFmbl9jMmhoY21VdGNHVnliV2x6YzJsdmJuTXRiV0YwY21sNC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=b8LFViHtTHbp3kCQDcYFhNtfckXlpYnd68uxwQacSSkquYz7GHhkxp9CP10-h0p2O6B70ta7fzUKal1eH4fENlDwe8M61E10~YyiZS9sQm5eIHyP0hnf1OpLFBPoZ0aCYSy5KYMXBacaPoKa7Y5KEg6yHZMvSaSpVm5jdXzyhc3F6u4M9uS04rBVd~2OVM00V3nfNzM7VYqH4O9RR28GCTbtfkqGzLvMOOcyhXhHqFD6O4v6MrDn56U5yNV25JTkb~bxwD-UD~zIT1odH4K2uWaz8sQyNCdlbiU6CZB87B-B~RgULwDgAYGMrx4IiOFcqyb-sLkoELRLdjlz-8EmLA__",
      alt: "Effective Permissions Matrix",
      caption: "Matrice permisiuni efective: NTFS vs Share"
    }
  ],
  "users-management": [
    {
      src: "https://private-us-east-1.manuscdn.com/sessionFile/T2NeknTWTMMr8EPnLiL5e7/sandbox/dZPzv3ywy5GXb2vF6Wx9si-img-4_1770801093000_na1fn_dXNlci1tYW5hZ2VtZW50LXdvcmtmbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDJOZWtuVFdUTU1yOEVQbkxpTDVlNy9zYW5kYm94L2RaUHp2M3l3eTVHWGIydkY2V3g5c2ktaW1nLTRfMTc3MDgwMTA5MzAwMF9uYTFmbl9kWE5sY2kxdFlXNWhaMlZ0Wlc1MExYZHZjbXRtYkc5My5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=swzLj~rxwOna~bVha9nHncp3QqcB24lEABJNR4rG69CbcF7t1PO-1xJU7W2qH8kCDeal7JJhGghjxkJPSAEZhZPvqcULUnd30ISCG0jlxLuju7mxmHsYvXF~GB6FGaAbfgUNInE8pobLpaK52YB3KzSb3l0YdIViv1WhEZjt9dIckhUqNsgO3kjOWgHConEJkDgLwPULLjahRbbEXTSiIVvSmy5PW7HYUvz71XVb3oap2g0G65LeL18kMaQmJETW-6tc6OKP1~LXyiSHpAJEHdOwmw7lS-x65X6aj9mZUh1YEIfgG0O2iLulXafUrEruDqWHBKimH6As6HtIb1h45A__",
      alt: "User Management Workflow",
      caption: "Fluxul gestionării utilizatorilor în Active Directory"
    }
  ],
  "security-gpo": [
    {
      src: "https://private-us-east-1.manuscdn.com/sessionFile/T2NeknTWTMMr8EPnLiL5e7/sandbox/dZPzv3ywy5GXb2vF6Wx9si-img-5_1770801093000_na1fn_Z3BvLWFwcGxpY2F0aW9uLW9yZGVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDJOZWtuVFdUTU1yOEVQbkxpTDVlNy9zYW5kYm94L2RaUHp2M3l3eTVHWGIydkY2V3g5c2ktaW1nLTVfMTc3MDgwMTA5MzAwMF9uYTFmbl9aM0J2TFdGd2NHeHBZMkYwYVc5dUxXOTlaR1Z5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TZypufzg1KhC54AWxUqNlWC4IKJdL84jPgX9N~He4LWcgxWTZuxc2-mV952DojJvEIDxAMfBTqXaX1H7k~Y-Hjg7OTlvwv5nlvS5dcHIU7M8kUdMpnDlTEfIRPbrnAU9XmGtFxIInfJRqRoYrdSivqWxsBMpU7NvVY8Je~U~xiXLFgczjvgQ7z17P3NQ3aC-jzeN50unpnc6Edmfz2N7OccU~h2hZ2knQxRyBFkvjGs3THtosOMxClMPFfsWc2lEA~qT0M-uINSWiXWC2LqlcSMHLMHmsE6BAc22O6LgqgMZdhuufYye~Xv0iF7PJiuA97TI5baq08mDFDWXvYxbQ__",
      alt: "GPO Application Order",
      caption: "Ordinea aplicării Group Policy Objects"
    }
  ]
};

export default function SectionPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);
  
  const currentIndex = manualSections.findIndex(s => s.id === id);
  const section = manualSections[currentIndex];
  
  // Mapare ID-uri secțiuni la fișiere Markdown
  const markdownFileMap: Record<string, string> = {
    'ad-structure': 'ad_extended_from_pdf01.md',
    'networking': 'dns_networking_extended_from_pdf01.md',
    'users-management': 'users_groups_extended_from_pdf02.md',
    'groups': 'users_groups_extended_from_pdf02.md',
    'file-server': 'fileserver_extended_from_pdf03.md',
    'ntfs-advanced': 'fileserver_extended_from_pdf03.md',
    'dfs-system': 'fileserver_extended_from_pdf03.md',
    'security-gpo': 'gpo_extended_from_pdf04.md',
    'gpo-advanced': 'gpo_extended_from_pdf04.md',
    'print-server': 'printserver_extended_from_pdf05.md',
    'task-manager': 'servermanagement_extended_from_pdf06.md',
    'event-viewer': 'servermanagement_extended_from_pdf06.md',
    'system-monitor': 'servermanagement_extended_from_pdf06.md',
    'audit-logging': 'servermanagement_extended_from_pdf06.md',
    'disk-management': 'diskmanagement_extended_from_pdf07.md',
    'physical-disks': 'diskmanagement_extended_from_pdf07.md',
    'basic-dynamic-disk': 'diskmanagement_extended_from_pdf07.md',
    'partitions': 'diskmanagement_extended_from_pdf07.md',
    'spanned-volumes': 'diskmanagement_extended_from_pdf07.md',
    'raid-levels': 'diskmanagement_extended_from_pdf07.md',
    'diskpart': 'diskmanagement_extended_from_pdf07.md',
  };
  
  // Încarcă conținut Markdown dacă există
  useEffect(() => {
    const markdownFile = markdownFileMap[id || ''];
    if (markdownFile) {
      setLoadingMarkdown(true);
      fetch(`/content/${markdownFile}`)
        .then(res => res.text())
        .then(text => {
          setMarkdownContent(text);
          setLoadingMarkdown(false);
        })
        .catch(err => {
          console.warn(`Failed to load markdown for ${id}:`, err);
          setMarkdownContent('');
          setLoadingMarkdown(false);
        });
    }
  }, [id]);
  
  const prevSection = currentIndex > 0 ? manualSections[currentIndex - 1] : null;
  const nextSection = currentIndex < manualSections.length - 1 ? manualSections[currentIndex + 1] : null;
  
  const images = sectionImages[id] || [];
  const videos = getVideosForSection(id || '');
  
  // Diagrame pentru secțiuni specifice
  const renderDiagrams = () => {
    switch(id) {
      case 'ad-structure':
        return (
          <Diagram title="Active Directory Forest Structure" description="Exemplu de structură forest cu domenii și OU-uri">
            <ADStructureDiagram />
          </Diagram>
        );
      case 'file-server':
        return (
          <Diagram title="File Server Permissions Architecture" description="Structura permisiunilor pe file server cu share-uri și NTFS">
            <FileServerPermissionsDiagram />
          </Diagram>
        );
      case 'security-gpo':
        return (
          <Diagram title="GPO Application Order (LSDOU)" description="Ordinea în care sunt aplicate Group Policy Objects">
            <GPOApplicationOrderDiagram />
          </Diagram>
        );
      case 'raid-levels':
        return (
          <Diagram title="RAID Levels Comparison" description="Comparație între RAID 0, RAID 1 și RAID 5">
            <RAIDLevelsDiagram />
          </Diagram>
        );
      case 'networking':
        return (
          <Diagram title="DNS Resolution Process" description="Procesul de rezolvare a numelor de domeniu">
            <DNSResolutionDiagram />
          </Diagram>
        );
      default:
        return null;
    }
  };

  if (!section) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Secțiune nu găsită</h1>
          <Button
            variant="link"
            onClick={() => setLocation('/')}
            className="text-primary hover:underline"
          >
            <Home className="w-4 h-4 mr-2" />
            Înapoi la acasă
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">{section.title}</h1>
          <p className="text-lg text-muted-foreground">{section.description}</p>
        </div>

        {/* Diagrams */}
        {renderDiagrams()}

        {/* Videos */}
        {videos.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Videoclipuri Educative</h2>
            </div>
            <div className="space-y-4">
              {videos.map((video, index) => (
                <YouTubeEmbed
                  key={index}
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Ilustrații</h2>
            <ImageGallery images={images} />
          </div>
        )}

        {/* Content */}
        <Card className="p-6 md:p-8 bg-card border-border">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            {loadingMarkdown ? (
              <p className="text-muted-foreground">Se încarcă conținut...</p>
            ) : markdownContent ? (
              <Streamdown>{markdownContent}</Streamdown>
            ) : (
              <Streamdown>{section.content}</Streamdown>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          {prevSection ? (
            <Button
              variant="ghost"
              onClick={() => setLocation(`/section/${prevSection.id}`)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{prevSection.title}</span>
            </Button>
          ) : (
            <div />
          )}

          {nextSection ? (
            <Button
              variant="ghost"
              onClick={() => setLocation(`/section/${nextSection.id}`)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-sm font-medium">{nextSection.title}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </article>
    </Layout>
  );
}
