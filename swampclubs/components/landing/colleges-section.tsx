export function CollegesSection() {
    return (
      <section className="w-full py-12 border-y bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-sm font-medium text-muted-foreground">Connect with clubs from every UF college</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {[
                "Herbert Wertheim College of Engineering",
                "College of Liberal Arts & Sciences",
                "College of Public Health and Professions",
                "College of Health and Human Performance",
                "Warrington College of Business",
                "College of Journalism and Communications",
                "College of Agricultural and Life Sciences"
              ].map((college, i) => (
                <div key={i} className="text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                  {college}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  